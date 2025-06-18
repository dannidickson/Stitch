// stores/packagistStore.js
import { defineStore } from 'pinia';

export const usePackagistStore = defineStore('packagist', {
  state: () => ({
    packages: [],
    totalCount: 0,
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 10,
    searchQuery: '',
  }),
  
  getters: {
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage);
    },
    
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
    
    hasPreviousPage() {
      return this.currentPage > 1;
    }
  },
  
  actions: {
    async fetchPackages() {
      this.loading = true;
      this.error = null;
      
      try {
        const params = {
          q: this.searchQuery || '',
          page: this.currentPage - 1, // Packagist uses 0-based pagination
          per_page: this.perPage
        };
        
        const response = await axios.get('https://packagist.org/search.json', { params });
        
        this.packages = response.data.results;
        this.totalCount = response.data.total;
      } catch (err) {
        this.error = err.message || 'Failed to fetch packages';
        console.error('Error fetching packages:', err);
      } finally {
        this.loading = false;
      }
    },
    
    setPage(page) {
      this.currentPage = page;
      this.fetchPackages();
    },
    
    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
        this.fetchPackages();
      }
    },
    
    previousPage() {
      if (this.hasPreviousPage) {
        this.currentPage--;
        this.fetchPackages();
      }
    },
    
    setPerPage(count) {
      this.perPage = count;
      this.currentPage = 1; // Reset to first page when changing items per page
      this.fetchPackages();
    },
    
    setSearchQuery(query) {
      this.searchQuery = query;
      this.currentPage = 1; // Reset to first page when changing search
      this.fetchPackages();
    }
  }
})