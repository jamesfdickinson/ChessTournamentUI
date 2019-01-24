<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="key in columns"
          :key="key"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
        >
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :key="entry.indexOf">
        <td v-for="key in columns" :key="key">{{entry[key]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "GridSort",
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function() {
    var sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortKeys: [],
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredData: function() {
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
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function(key) {
      //todo: add array of sort keys

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
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
table {
  min-width: 100%;
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
   color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
xtd {
  background-color: #f9f9f9;
}

th,
td {
  xmin-width: 90px;
  xpadding: 10px 20px;
  padding: 4px 4px;
  font-size: .80em;
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
</style>
