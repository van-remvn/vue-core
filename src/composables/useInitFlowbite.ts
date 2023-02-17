import {
    initAccordions,
    initCarousels,
    initCollapses,
    initDials,
    initDismisses,
    initDrawers,
    initDropdowns,
    initModals,
    initPopovers,
    initTabs,
    initTooltips,
} from 'flowbite'

export default function useInitFlowbite() {

    const initFlowbite = () => {
        initAccordions()
        initCarousels()
        initCollapses()
        initDials()
        initDismisses()
        initDrawers()
        initDropdowns()
        initModals()
        initPopovers()
        initTabs()
        initTooltips()
    }

    onMounted(() => {
        initFlowbite()
    })

    return {
        initFlowbite,
    }

}

