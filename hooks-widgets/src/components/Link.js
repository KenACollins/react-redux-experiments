import React from 'react';

const Link = ({ href, className, children }) => {
    const onClick = (event) => {
        // If MacOS command or Windows Ctrl key was pressed when clicking on a header widget option (Accordion, Search, etc.), 
        // this indicates user wants to open widget in a new browser tab, so let that happen.
        if (event.metaKey || event.ctrlKey) { return; }

        // Prevent extra network calls to retrieve bundle.js, 0.chunk.js, CSS, images, and other artifacts that are already cached.
        event.preventDefault();

        // Change URL in location bar to match desired route. This does not change content on-screen. That will happen in Route onLocationChange().
        window.history.pushState({}, '', href);

        // Communicate to Route component that the URL has just changed by inventing a new type of event and triggering it.
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return <a onClick={onClick} href={href} className={className}>{children}</a>;
};

export default Link;