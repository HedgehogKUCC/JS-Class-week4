new Vue({
  el: '#pets',
  data: {
    pets: [
      {
        id: 1594291248631,
        unit: '隻',
        category: '喵星人',
        title: '愛睏喵',
        origin_price: 100,
        price: 50,
        description: '米克斯',
        content: '好想睡',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 1594291965421,
        unit: '隻',
        category: '汪星人',
        title: '活潑汪',
        origin_price: 100,
        price: 50,
        description: '馬爾濟斯',
        content: '好想你',
        is_enabled: 0,
        imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
      }
    ],
    tempData: {},
    modalFeature: '',
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
    }
  },
})