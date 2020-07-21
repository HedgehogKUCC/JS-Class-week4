export default {
  template: `<div
    id="productModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="modalFeature === 'new'">新增 遛噠星人 個資</span>
            <span v-else-if="modalFeature === 'edit'">編輯個資</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">輸入圖片網址</label>
                <input
                  id="imageUrl"
                  v-model="tempData.imageUrl[0]"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <img class="img-fluid" :src="tempData.imageUrl" alt />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">綽號</label>
                <input
                  id="title"
                  v-model="tempData.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入綽號"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    id="category"
                    v-model="tempData.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input
                    id="unit"
                    v-model="tempData.unit"
                    type="unit"
                    class="form-control"
                    placeholder="隻"
                    disabled
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">罐頭原價</label>
                  <input
                    id="origin_price"
                    v-model="tempData.origin_price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入罐頭原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">罐頭售價</label>
                  <input
                    id="price"
                    v-model="tempData.price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入罐頭售價"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">品種</label>
                <textarea
                  id="description"
                  v-model="tempData.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入品種"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">語錄</label>
                <textarea
                  id="description"
                  v-model="tempData.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入 murmur"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempData.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="modalFeature === 'new'"
            type="button"
            class="btn btn-primary"
            @click="updatePets"
          >
            新增確認
          </button>
          <button
            v-else-if="modalFeature === 'edit'"
            type="button"
            class="btn btn-primary"
            @click="updatePets"
          >
            編輯確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    tempData: {
      type: Object,
      default: () => {},
    },
    modalFeature: {
      type: String,
      default: ''
    },
    api: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    updatePets() {
      const { path, uuid } = this.api;
      switch (this.modalFeature) {
        case 'new':
          this.tempData.id = new Date().getTime();
          if (!this.tempData.is_enabled) {
            this.tempData.is_enabled = 0;
          }
          const newTempData = {...this.tempData, unit: '隻'};
          const newApi = `${path}${uuid}/admin/ec/product`;
          axios.post(newApi, newTempData).then(() => {
            this.$emit('update');
          });
          break
        case 'edit':
          const editApi = `${path}${uuid}/admin/ec/product/${this.tempData.id}`;
          axios.patch(editApi, this.tempData).then(() => {
            this.$emit('update');
          });
          break;
        default:
          break;
      }
    },
  },
}