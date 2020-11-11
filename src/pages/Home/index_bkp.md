```ts

import React, { MouseEvent, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AppTopbar } from '../../AppTopbar';
import classNames from 'classnames';

import logo from './../../../public/assets/logo_vale.png';

import Header from '../../Header';

const AbsHome = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [layoutColorMode, setLayoutColorMode] = useState('dark');
    const sidebar = useRef();

    let menuClick = false;

    const onWrapperClick = (event: MouseEvent ) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });
    
    const onToggleMenu = ( event: MouseEvent<HTMLButtonElement> ) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }

        return true;
    }
    
    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    return (
        <div onClick={onWrapperClick}>
            <AppTopbar onToggleMenu={onToggleMenu} />

            <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} />
                    </div>
                    //<AppProfile />
                    //<AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>


            
            // <AppFooter />
            

        </div>
    );

};
export default AbsHome;

```