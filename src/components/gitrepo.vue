<template>

    <div class="layout-padding">
    <div class="row justify-end">
      <button class="button primary small" @click="goSearchHistory">View Code Search</button>
    </div>
      <q-data-table
        :data="repoList"
        :config="config"
        :columns="columns"
      >
        <template slot="selection" scope="props">
          <button class="primary clear big red" @click="remove(props)">
            <i>fast_rewind</i>
          </button>
          <button class="primary clear big" @click="add(props)">
            <i>fast_forward</i>
          </button>
        </template>
          <template slot="col-isSync" scope="cell">
          <span v-if="cell.data === 'true'" class="label text-white bg-primary">
            True
          </span>
          <span v-else class="label text-white bg-negative">False</span>
        </template>
      </q-data-table>
    </div>
</template>

<script>
import { Platform, Toast } from 'quasar'
import * as http from '../http'
import api from 'api'
export default {
  methods: {
    getrepoList () {
      http.fetch(api.getRepoList, {
        'offset': this.skipCount,
        'limit': this.takeCount,
        'keyword': this.searchKeyword
    }).then(data => {
        this.repoList = data.data.dataList
        this.totalCount = data.data.totalCount
        this.skipCount = data.data.dataSkip
        this.takeCount = data.data.dataTake
    })
    },
    remove (props) {
        props.rows.forEach(row => {
        console.log(row.data)
        let id = row.data.repoId
        http.del(api.syncCode(id)).then(data => {
            this.getrepoList()
            Toast.create.positive(`Remove searchcode success.`)
        }).catch(() => {})
      })
    },
    add (props) {
      props.rows.forEach(row => {
          console.log(row.data)
          let id = row.data.repoId
          http.post(api.syncCode(id)).then(data => {
              this.getrepoList()
              Toast.create.positive(`Add searchcode success.`)
          }).catch(() => {})
      })
    },
    goSearchHistory: function () {
        this.$router.push({
            path: '/search'
       })
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  created() {
    this.getrepoList()
  },
  data () {
    return {
      repoList: [],
      totalCount: 0,
      takeCount: 65535,
      skipCount: 0,
      searchKeyword: null,
      config: {
        title: 'Git Project List',
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
          label: 'Name',
          field: 'name',
          sort: true,
          filter: true
//          width: '500px',
        },
       {
          label: 'URL',
          field: 'url',
          sort: true,
          filter: true,
          width: '400px'
        },
          {
          label: 'Last Activity',
          field: 'lastActivityAt',
          sort: true,
          filter: true
        },
          {
          label: 'Last PushMaster',
          field: 'lastPushMaster',
          sort: true,
          filter: true
        },
          {
          label: 'Indexed',
          field: 'isSync',
          sort: true,
          filter: true
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
