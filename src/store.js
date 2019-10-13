import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
  SET_USER: 'SET_USER', // 用户信息
  SET_TARGET_USER: 'SET_TARGET_USER',
  SET_CHAT_LIST: 'SET_CHAT_LIST'

};

const state = {
  // 需要维护的状态
  user: {}, // 存储用户信息,可以一开始就在app.vue里面设置默认值
  targetUser: {},
  active: {
    msgCount: 0,
    loveCount: 0
  },
  chatList: [],
  scrollInterval:null,
};

const getters = {
  user: state => state.user,
  targetUser: state => state.targetUser,
  active: state => state.active,
  chatList: state => state.chatList,
  scrollInterval:state=>state.scrollInterval,
};

const mutations = {
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },

  [types.SET_TARGET_USER](state, targetUser) {
    if (targetUser) state.targetUser = targetUser;
    else state.targetUser = {};
  },
  [types.SET_CHAT_LIST](state, chatList) {
    if (chatList) state.chatList = chatList;
    else state.chatList = [];
  }
};

const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  setTargetUser: ({ commit }, targetUser) => {
    commit(types.SET_TARGET_USER, targetUser);
  },
  setChatList: ({ commit }, chatList) => {
    commit(types.SET_CHAT_LIST, chatList);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
