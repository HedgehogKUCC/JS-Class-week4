import pagination from './pagination.js';

Vue.component('Pagination', pagination);

new Vue({
  el: '#pets',
  data: {
    pets: [],
    pagination: {},
    tempData: {},
    modalFeature: '',
    api: {
      uuid: '0a913983-0ee4-4ff5-b07f-d35971afff52',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
  },
  methods: {
    openModal(features, item) {
      switch (features) {
        case 'new':
          this.modalFeature = features;
          this.tempData = {};
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.modalFeature = features;
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#productModal').modal('show');
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
    updatePets() {
      if (this.tempData.id) {
        this.pets.forEach((item, index) => {
          if (item.id === this.tempData.id) {
            this.pets[index] = this.tempData;
          }
        })
      } else {
        this.tempData.id = new Date().getTime();
        if (!this.tempData.is_enabled) {
          this.tempData.is_enabled = 0;
        }
        const newTempData = {...this.tempData, unit: '隻'};
        this.pets.push(newTempData);
      }
      this.tempData = {};
      $('#productModal').modal('hide');
    },
    delPet() {
      if (this.tempData.id) {
        const id = this.tempData.id;
        this.pets.forEach((item, index) => {
          if (item.id === id) {
            this.pets.splice(index, 1);
            this.tempData = {};
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