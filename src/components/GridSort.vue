<template>
  <div>
    <div class="section-not-to-print">
      <!-- <ion-button style="float:right;" @click="print()">Print</ion-button>-->
      <download-csv style="float:right;" :data="filteredData" :name="(title||'report')+'.csv'">
        <ion-button>Export Data</ion-button>
      </download-csv>
    </div>
    <div id="printable" class="section-to-print">
      <h1 v-show="title" class="title">{{title}}</h1>
      <div v-show="description" class="description">{{description}}</div>
      <table>
        <thead>
          <tr>
            <th v-for="key in columns" :key="key" @click="sortBy(key)">
              {{ key | capitalize }}
              <span
                class="arrow section-not-to-print"
                :class="sortOrders && (sortOrders[key] > 0) ? 'asc' : 'dsc'"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredData" :key="entry.indexOf">
            <td v-for="key in columns" :key="key">{{entry[key]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridSort",
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    sortKeys: {
      type: Array,
      default: () => []
    },
    sortOrders: {
      type: Object,
      default: () => ({})
    },
    title: String,
    description: String
  },
  data: function() {
    // var sortOrders = {};
    // this.columns.forEach(function(key) {
    //   sortOrders[key] = 1;
    // });
    return {};
  },
  computed: {
    filteredData: function() {
      var data = this.getFilteredData();
      return data;
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    getFilteredData: function() {
      //var sortKey = this.sortKey;
      var sortKeys = this.sortKeys;
      var sortOrders = this.sortOrders;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.data;
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      // if (sortKey) {
      //   let order = sortOrders[sortKey];
      //   data = data.slice().sort(function(a, b) {
      //     a = a[sortKey];
      //     b = b[sortKey];
      //     return (a === b ? 0 : a > b ? 1 : -1) * order;
      //   });
      // }
      if (sortKeys) {
        data = data.slice().sort(function(a, b) {
          for (let i = 0; i < sortKeys.length; i++) {
            let sortKey = sortKeys[i];

            if (!sortOrders) sortOrders = {};
            let order = sortOrders[sortKey] || 1;
            let aV = a[sortKey];
            let bV = b[sortKey];
            let compValue = aV === bV ? 0 : aV > bV ? 1 : -1;
            if (compValue !== 0) return compValue * order;
          }
          return 0;
        });
      }
      return data;
    },
    sortBy: function(key) {
      //add array of sort keys

      //remove it if it is in the list
      var index = this.sortKeys.indexOf(key);
      if (index > -1) {
        this.sortKeys.splice(index, 1);
      }
      //append key to begaining of list
      this.sortKeys.unshift(key);

      // //old single sort key
      // this.sortKey = key;

      //sort order
      if (!this.sortOrders) this.sortOrders = {};
      if (!this.sortOrders[key]) this.sortOrders[key] = 1; 
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
    // ,    print() {
    //   window.print();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin: 20px 10px 10px 10px;
}
.description {
  margin: 3px 10px 3px 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #16a085;
}
table {
  min-width: 100%;
  xborder: 2px solid #16a085;
  xborder-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #16a085;
  background-color: #3880ff;

  color: rgba(255, 255, 255, 0.66);
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  white-space: nowrap;
  text-align: left;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
xtd {
  background-color: #f9f9f9;
}
th,
td {
  min-width: 50px;
  padding: 8px 4px;
  xborder-right: solid white 1px;
  text-align: left;
}
th {
  font-size: 1em;
  /* font-size: 20px; */
  font-weight: 500;
}

td {
  padding: 4px 4px;
  font-size: 0.8em;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

@media print {
  .section-not-to-print *,
  .section-not-to-print {
    visibility: hidden;
    display: none;
  }
}
</style>
