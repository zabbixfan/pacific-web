<template>

    <div class="layout-padding">

      <q-data-table
        :data="searchList"
        :config="config"
        :columns="columns"
      >

      </q-data-table>
    </div>
</template>

<script>
import { Platform } from 'quasar'
import * as http from '../http'
import api from 'api'
export default {
  methods: {
    getSearchList () {
      http.fetch(api.getSearchList, {
        'offset': this.skipCount,
        'limit': this.takeCount,
        'keyword': this.searchKeyword
    }).then(data => {
        this.searchList = data.data.dataList
        this.totalCount = data.data.totalCount
        this.skipCount = data.data.dataSkip
        this.takeCount = data.data.dataTake
    })
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  created() {
    this.getSearchList()
  },
  data () {
    return {
      searchList: [],
      totalCount: 0,
      takeCount: 65535,
      skipCount: 0,
      searchKeyword: null,
      config: {
        title: 'Code Search History',
        refresh: false,
        leftStickyColumns: 0,
        bodyStyle: {
          maxHeight: Platform.is.mobile ? '50vh' : '500px'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        },
        messages: {
          noData: '<i>warning</i> Loading Data.',
          noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
        }
      },
      columns: [
         {
          label: 'searchUser',
          field: 'name',
          sort: true,
          filter: true
//          width: '500px',
        },
       {
          label: 'searchWord',
          field: 'url',
          sort: true,
          filter: true,
          width: '400px'
        },
          {
          label: 'searchTime',
          field: 'time',
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
