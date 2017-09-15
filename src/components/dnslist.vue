<template>

    <div class="layout-padding">
      <q-select
      type="list"
      v-model="domain"
      label="Domain Name"
      @input="input"
      :options="domainOptions">
      </q-select>
      <q-select
      type="list"
      v-model="type"
      label="Type"
      @input="input"
      :options="typeOptions">
      </q-select>
      <div class="row justify-end">
          <button class="button primary small" @click="create">Create New Record</button>
          <button class="button primary secondary small" @click="createall">Create(all env)</button>
          <button class="button primary red small" @click="deleteall">delete(all env)</button>
      </div>
      <q-data-table
        :data="dnsList"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >

        <template slot="selection" scope="props">
          <button class="primary clear" @click="update(props)">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteRow(props)">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
    </div>

</template>

<script>
import { Platform, Dialog, Toast } from 'quasar'
import * as http from '../http'
import api from 'api'
import config from '../config'
const domainlist = config.domain
const typelist = config.type
export default {
  methods: {
    input(props) {
        this.getDnsList()
    },
    create () {
        let local = this
        Dialog.create({
          title: 'New DNS Record',
          form: {
              record: {
                  type: 'textbox',
                  label: 'Record'

              },
              value: {
                  type: 'textbox',
                  label: 'IP Value or CNAME Value'
              }},

          buttons: [
            {
              label: 'Submit',
              handler (data) {
                  http.post(api.Dns(data.record), {'value': data.value, 'domain': local.domain, 'type': local.type}).then(data => {
                      local.getDnsList()
                      Toast.create.positive(`Create success.`)
                  }).catch(() => {
                  })
              }
            },
              {
                label: 'Cancel'
              }
          ]
        })
    },
    createall () {
        let local = this
        Dialog.create({
          title: 'New DNS Record(All ENV)',
          form: {
              record: {
                  type: 'textbox',
                  label: 'Record'
              }
},
          buttons: [
            {
              label: 'Submit',
              handler (data) {
                  http.post(api.batch(data.record)).then(data => {
                      local.getDnsList()
                      Toast.create.positive(`Create success.`)
                  }).catch(() => {
                  })
              }
            },
              {
                label: 'Cancel'
              }
          ]
        })
    },
    deleteall () {
        let local = this
        Dialog.create({
          title: 'Delete DNS Record(All ENV)',
          form: {
              record: {
                  type: 'textbox',
                  label: 'Record'

              }},
          buttons: [
            {
              label: 'Submit',
              handler (data) {
                  http.del(api.batch(data.record)).then(data => {
                      local.getDnsList()
                      Toast.create.positive(`Delete success.`)
                  }).catch(() => {
                  })
              }
            },
              {
                label: 'Cancel'
              }
          ]
        })
    },
    getDnsList () {
      http.fetch(api.getDnsList, {
        'offset': this.skipCount,
        'limit': this.takeCount,
        'keyword': this.searchKeyword,
        'domain': this.domain,
        'type': this.type
    }).then(data => {
        this.dnsList = data.data.Datalist
        this.totalCount = data.data.TotalCount
        this.skipCount = data.data.Start
        this.takeCount = data.data.Limit
    })
    },
    update (props) {
      props.rows.forEach(row => {
        let record = row.data.Record
        let local = this
        Dialog.create({
          title: 'Modify Record',
          form: {
              value: {
                  type: 'textbox',
                  label: 'New Value of ' + row.data.Record + local.domain + '  type:' + local.type,
                  model: row.data.Value
              }
          },
          buttons: [
            {
              label: 'Submit',
              handler (data) {
                let params = {
                   'value': data.value,
                   'domain': local.domain,
                   'type': local.type
                }
                http.put(api.Dns(record), params).then(data => {
                    local.getDnsList()
                    Toast.create.positive(`Create success.`)
                }).catch(() => {})
              }
            }
          ]
        })
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
          let record = row.data.Record
          let params = {
              'domain': this.domain,
              'type': this.type
          }
          http.del(api.Dns(record), params).then(data => {
              this.getDnsList()
          })
      })
    },
    refresh (done) {
//      this.timeout = setTimeout(() => {
//        this.getDnsList()
//      }, 200)
      this.getDnsList()
      done()
    }

  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  created() {
    this.getDnsList()
  },
  data () {
    return {
      dnsList: [],
      domain: domainlist[0]['value'],
      domainOptions: domainlist,
      type: typelist[0]['value'],
      typeOptions: typelist,
      totalCount: 0,
      takeCount: 0,
      skipCount: 0,
      searchKeyword: null,
      config: {
        title: 'DNS List',
        refresh: false,
        columnPicker: true,
        leftStickyColumns: 1,
        bodyStyle: {
          maxHeight: Platform.is.mobile ? '50vh' : '500px'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        },
        selection: 'multiple',
        messages: {
          noData: '<i>warning</i> Loading Data.',
          noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
        }
      },
      columns: [
         {
          label: 'Record',
          field: 'Record',
          sort: true,
          filter: true
//          width: '500px',
        },
          {
          label: 'Value',
          field: 'Value',
          sort: true,
          filter: true
//          width: '500px',
        },
          {
          label: 'Type',
          field: 'Type',
          sort: true,
          filter: true
//          width: '500px',
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  watch: {

  }
}
</script>
<style>
    .justify-end {
        margin-bottom: 10px
    }
    .primary{
        margin-left:10px
    }
</style>
