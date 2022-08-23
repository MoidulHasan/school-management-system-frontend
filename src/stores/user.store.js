/**
 * Name: User Store
 * Description: This pinia store manage user related data storage
 * Author: Moidul Hasan Khan
 * Date: 15 August 2022
 */

// Dependencies
import { defineStore } from "pinia";


// Store Scafolding
export const useUserStore = defineStore('User', {
    state: () => ({
        user: {},
        isLoggedIn: false
    }),
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        removeUser() {
            this.user = null;
        }
    }
})


