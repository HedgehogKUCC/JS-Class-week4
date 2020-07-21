import pagination from './pagination.js';
import productModal from './productModal.js';

Vue.component('Pagination', pagination);
Vue.component('product-modal', productModal);

new Vue({
  el: '#pets',
  data: {
    pets: [],
    pagination: {},
    tempData: {
      imageUrl: [],
    },
    modalFeature: '',
    api: {
      uuid: '0a913983-0ee4-4ff5-b07f-d35971afff52',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
    loadingBtn: '',
  },
  methods: {
    openModal(features, item) {
      switch (features) {
        case 'new':
          this.modalFeature = features;
          this.tempData = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          const api = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`
          this.loadingBtn = item.id;
          this.modalFeature = features;
          axios.get(api).then(res => {
            this.tempData = res.data.data;
            $('#productModal').modal('show');
            this.loadingBtn = '';
          })
          break;
        case 'del':
          this.modalFeature = features;
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    delPet() {
      if (this.tempData.id) {
        const id = this.tempData.id;
        this.pets.forEach((item, index) => {
          if (item.id === id) {
            this.pets.splice(index, 1);
            this.tempData = {
              imageUrl: [],
            };
          }
        })
      }
      $('#delProductModal').modal('hide');
    },
    getPets(num = 1) {
      const api = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`

      axios.get(api).then(res => {
        this.pets = res.data.data
        this.pagination = res.data.meta.pagination

        if (this.tempData.id) {
          this.tempData = {
            imageUrl: [],
          };
          $('#productModal').modal('hide');
        }
      })
    }
  },
  created() {
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )

    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

    this.getPets()
  }
})