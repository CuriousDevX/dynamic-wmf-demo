export const preventCSSCollision = (currentRemoteName) => {
    // Ensure global properties exist
    if (!window.observers) {
        window.observers = {}
    }

    if (!window.observingStates) {
        window.observingStates = {}
    }

    // Get all style tags in head
    const allStyles = [...document.head.querySelectorAll('style')]

    // Tagging rules
    const tagExistingStyles = () => {
        // Selecting style elements that don't have data-host and don't have data-remote
        const styleTags = allStyles.filter((style) => !style.hasAttribute('data-host') && !style.hasAttribute('data-remote'))
        styleTags.forEach((styleTag) => {
            styleTag.setAttribute('data-remote', currentRemoteName)
        })
    }

    // Disabling and enabling styles
    const disableOtherRemoteStyles = () => {
        const otherStyles = allStyles.filter((style) => !style.hasAttribute('data-host') && style.getAttribute('data-remote') !== currentRemoteName)
        otherStyles.forEach((styleTag) => {
            styleTag.setAttribute('media', 'disabled')
        })
    }

    const enableRemoteStyles = () => {
        const styles = allStyles.filter((style) => style.getAttribute('data-remote') === currentRemoteName)
        styles.forEach((styleTag) => {
            styleTag.removeAttribute('media')
        })
    }

    // Disconnect any existing observers for this currentRemoteName
    if (window.observingStates[currentRemoteName] && window.observers[currentRemoteName]) {
        window.observers[currentRemoteName].disconnect()
    }

    // Start the tagging process
    tagExistingStyles()

    // Start the disable/enable styles process
    disableOtherRemoteStyles()
    enableRemoteStyles()

    // Observer logic for new styles added to the DOM
    const observerLogic = (mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (let addedNode of mutation.addedNodes) {
                    if (
                        addedNode.nodeType === Node.ELEMENT_NODE &&
                        addedNode.nodeName === 'STYLE' &&
                        !addedNode.hasAttribute('data-remote') &&
                        !addedNode.hasAttribute('data-host')
                    ) {
                        addedNode.setAttribute('data-remote', currentRemoteName)
                    }
                }
            }
        }
    }

    // Create a new observer for currentRemoteName and start observing
    window.observers[currentRemoteName] = new MutationObserver(observerLogic)
    window.observers[currentRemoteName].observe(document.head, { childList: true })
    window.observingStates[currentRemoteName] = true
}
export default preventCSSCollision
