import type { App } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
    install: (app: App) => {
        app.component('Disclosure', Disclosure)
        app.component('DisclosureButton', DisclosureButton)
        app.component('DisclosurePanel', DisclosurePanel)
        app.component('Menu', Menu)
        app.component('MenuButton', MenuButton)
        app.component('MenuItem', MenuItem)
        app.component('MenuItems', MenuItems)
        app.component('Bars3Icon', Bars3Icon)
        app.component('BellIcon', BellIcon)
        app.component('XMarkIcon', XMarkIcon)
    },
}
