const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  integralOrderAddress: state => state.integralOrder.orderAddress,
  searchGoodsList: state => state.searchGoods.goodsNameList,
  AdShow: state => state.user.AdShow,
  total_sales: state => state.user.total_sales,
  team_order_count: state => state.user.team_order_count,
  team_order_history: state => state.user.team_order_history,
  total_commission: state => state.user.total_commission,
  order_commission: state => state.user.order_commission,
  paper_img: state => state.user.paper_img,
  statusBar: state => state.system.statusBar,
  customBar: state => state.system.customBar,
  systemInfo: state => state.system.systemInfo,
  locationData: state => state.user.locationData,
  locationName: state => {
    let {
      prov,
      city,
      dist
    } = state.user.locationData
    return `${prov}${city}${dist}`
  },
  page_params: state => state.user.page_params
}
export default getters