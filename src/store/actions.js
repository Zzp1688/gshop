import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'
export default {
  async getAddress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      console.log(result)
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getCategorys({ commit, state }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops({ latitude, longitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    console.log(result)
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
    callback && callback()
  },
  upstateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      // eslint-disable-next-line
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
}
