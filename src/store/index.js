import Vue from 'vue';
import Vuex from 'vuex';

import { OpenEO, FileTypes } from '@openeo/js-client';
import { ProcessRegistry } from '@openeo/js-processgraphs';
import Utils from '../utils.js';
// Sub-modules
import editor from './editor';
import files from './files';
import jobs from './jobs';
import services from './services';
import userProcesses from './userProcesses';

Vue.use(Vuex);

const getDefaultState = () => {
	return {
		connection: null,
		discoveryCompleted: false,
		isAuthenticated: false,
		userInfo: {},
		connectionError: null,
		discoveryErrors: [],
		authProviders: [],
		fileFormats: {},
		serviceTypes: {},
		udfRuntimes: {},
		predefinedProcesses: [],
		collections: []
	};
};

export default new Vuex.Store({
//	strict: true,
	modules: {
		editor,
		files,
		jobs,
		services,
		userProcesses
	},
	state: getDefaultState(),
	getters: {
		title: (state) => {
			if (state.connection !== null && state.connection.capabilities() !== null) {
				var title = state.connection.capabilities().title();
				return title ? title : state.connection.getBaseUrl();
			}
			return null;
		},
		capabilities: (state) => state.connection !== null ? state.connection.capabilities() : null,
		supports: (state) => (feature) => state.connection !== null && state.connection.capabilities() !== null && state.connection.capabilities().hasFeature(feature),
		currency: (state) => {
			var currency = '';
			if (state.connection && state.connection.capabilities().currency() !== null) {
				currency = state.connection.capabilities().currency();
			}
			return currency;
		},
		isConnected: (state) => state.connection !== null && state.connection.capabilities() !== null,
		isDiscovered: (state) => state.connection !== null && state.discoveryCompleted,
		supportsBilling: (state) => state.connection !== null && state.connection.capabilities().currency() !== null,
		supportsBillingPlans: (state) => state.connection !== null && state.connection.capabilities().currency() !== null && state.connection.capabilities().listPlans().length > 0,
		apiVersion: (state) => state.connection !== null ? state.connection.capabilities().apiVersion() : null,
		fileFormats: (state) => state.fileFormats instanceof FileTypes ? state.fileFormats.toJSON() : {input: {}, output: {}},
		processRegistry: (state) => {
			var registry = new ProcessRegistry(state.predefinedProcesses);
			registry.addAll(state.userProcesses.userProcesses);
			return registry;
		},
		collectionDefaults: (state) => (id) => {
			var collection = state.collections.find(c => c.id === id);
			if (!Utils.isObject(collection)) {
				return {};
			}

			var spatial_extent = null;
			try {
				spatial_extent = Utils.extentToBBox(collection.extent.spatial.bbox[0]);
			} catch (error) {}

			var temporal_extent = null;
			try {
				// Only supports temporal ranges with start and end date.
				// All other temporal extents will be unbounded for now.
				// ToDo: Support open date ranges: https://github.com/mengxiong10/vue2-datepicker/issues/612
				temporal_extent = collection.extent.temporal.interval[0].filter(date => date !== null);
				if (temporal_extent.length !== 2) {
					temporal_extent = null;
				}
			} catch (error) {}
	
			var bands = null;
			return {id, spatial_extent, temporal_extent, bands};
		},
	},
	actions: {
		async connect(cx, url) {
			await cx.dispatch('logout');

			// Connect and request capabilities
			var connection = null;
			try {
				connection = await OpenEO.connect(url);
			} catch (error) {
				if(error.message == 'Network Error' || error.name == 'NetworkError') {
					error = new Error("Server is not available.");
				}
				cx.commit('setConnectionError', error);
				return false;
			}

			// Request auth provider list
			try {
				var providers = await connection.listAuthProviders();
				cx.commit('authProviders', providers);
			} catch (error) {
				cx.commit('setConnectionError', error);
				return false;
			}

			connection.on('authProviderChanged', provider => cx.commit('authenticated', provider !== null));

			// Only commit the connection change after requesting the auth providers
			// as this indicates that the connection procedure has finished.
			cx.commit('connection', connection);

			return true;
		},

		async discover(cx) {
			var promises = [];
			var capabilities = cx.state.connection.capabilities();

			// Request collections
			if (capabilities.hasFeature('listCollections')) {
				promises.push(cx.state.connection.listCollections()
					.then(response => cx.commit('collections', response))
					.catch(error => cx.commit('addDiscoveryError', error)));
			}
			else {
				cx.commit('addDiscoveryError', new Error("Collections not supported by the back-end."));
			}

			// Request processes
			if (capabilities.hasFeature('listProcesses')) {
				promises.push(cx.state.connection.listProcesses()
					.then(response => cx.commit('predefinedProcesses', response))
					.catch(error => cx.commit('addDiscoveryError', error)));
			}
			else {
				cx.commit('addDiscoveryError', new Error("Pre-defined processes not supported by the back-end."));
			}

			// Request custom processes
			if (capabilities.hasFeature('listUserProcesses') && cx.state.connection.isAuthenticated()) {
				promises.push(cx.dispatch('userProcesses/list')
					.catch(error => cx.commit('addDiscoveryError', error)));
			}

			// Request supported output formats
			if (capabilities.hasFeature('listFileTypes')) {
				promises.push(cx.state.connection.listFileTypes()
					.then(response => cx.commit('fileFormats', response))
					.catch(error => cx.commit('addDiscoveryError', error)));
			}

			// Request supported service types
			if (capabilities.hasFeature('listServiceTypes')) {
				promises.push(cx.state.connection.listServiceTypes()
					.then(response => cx.commit('serviceTypes', response))
					.catch(error => cx.commit('addDiscoveryError', error)));
			}

			// Request supported UDF runtimes
			if (capabilities.hasFeature('listUdfRuntimes')) {
				promises.push(cx.state.connection.listUdfRuntimes()
					.then(response => cx.commit('udfRuntimes', response))
					.catch(error => cx.commit('addDiscoveryError', error)));
			}

			// Request user account information
			var promise = cx.dispatch('describeAccount')
				.catch(error => cx.commit('addDiscoveryError', error));
			promises.push(promise);

			await Promise.all(promises);

			cx.commit('discoveryCompleted', true);
		},

		// Request user account info
		async describeAccount(cx) {
			if (cx.getters.supports('describeAccount') && cx.state.isAuthenticated) {
				var response = await cx.state.connection.describeAccount();
				cx.commit('userInfo', response);
			}
			else {
				cx.commit('userInfo');
			}
		},

		async describeCollection(cx, id) {
			let collection = cx.state.collections.find(c => c.id === id);
			if (!collection || !collection._loaded) {
				collection = await cx.state.connection.describeCollection(id);
				cx.commit('fillCollection', collection);
			}
			return collection;
		},

		async logout(cx) {
			if (cx.state.isAuthenticated) {
				// Logout (mostly for OIDC)
				var authProvider = cx.state.connection.getAuthProvider();
				if (authProvider !== null) {
					await authProvider.logout();
				}
			}
			// Reset values
			cx.commit('reset');
			cx.commit('jobs/reset');
			cx.commit('files/reset');
			cx.commit('services/reset');
			cx.commit('userProcesses/reset');
		}
	},
	mutations: {
		discoveryCompleted(state) {
			state.discoveryCompleted = true;
		},
		connection(state, connection) {
			state.connection = connection;
		},
		authProviders(state, authProviders) {
			state.authProviders = authProviders;
		},
		userInfo(state, info) {
			state.userInfo = Utils.isObject(info) ? info : {};
		},
		fileFormats(state, fileFormats) {
			state.fileFormats = fileFormats;
		},
		serviceTypes(state, serviceTypes) {
			// Make keys uppercase for simplicity
			if (Utils.isObject(serviceTypes)) {
				var obj = {};
				for(var key in serviceTypes) {
					obj[key.toUpperCase()] = serviceTypes[key];
				}
				state.serviceTypes = obj;
			}
			else {
				state.serviceTypes = serviceTypes;
			}
		},
		udfRuntimes(state, udfRuntimes) {
			state.udfRuntimes = udfRuntimes;
		},
		predefinedProcesses(state, data) {
			state.predefinedProcesses = data.processes
				.map(p => Object.assign(p, {native: true}))
				.filter(p => (typeof p.id === 'string'))
				.sort(Utils.sortById);
		},
		fillCollection(state, data) {
			let index = state.collections.findIndex(c => c.id === data.id);
			if (index !== -1) {
				data._loaded = true;
				Vue.set(state.collections, index, data);
			}
		},
		collections(state, data) {
			state.collections = data.collections
				.filter(c => (typeof c.id === 'string'))
				.sort(Utils.sortById);
		},
		setConnectionError(state, error) {
			state.connectionError = error;
		},
		addDiscoveryError(state, error) {
			state.discoveryErrors.push(error);
		},
		authenticated(state, isAuthenticated) {
			state.isAuthenticated = isAuthenticated;
			if (!isAuthenticated) {
				state.userInfo = {};
			}
		},
		reset(state) {
			Object.assign(state, getDefaultState());
		}
	}
});