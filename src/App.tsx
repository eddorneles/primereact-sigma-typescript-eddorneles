import React, { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// JSX: Sintaxe de XML dentro do JS
import { AppTopbar } from './AppTopbar';
import { CSSTransition } from 'react-transition-group';
import { AppFooter } from './AppFooter';
import { AppProfile } from './AppProfile';

import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';
import { AppMenu, MenuItem } from './AppMenu';

import menu from './MenuValues';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { ButtonDemo } from './components/ButtonDemo';
import { TableDemo } from './components/TableDemo';
import { ListDemo } from './components/ListDemo';
import { TreeDemo } from './components/TreeDemo';
import { PanelDemo } from './components/PanelDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { FileDemo } from './components/FileDemo';
import { ChartDemo } from './components/ChartDemo';
import { MiscDemo } from './components/MiscDemo';
import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { GridDemo } from './utilities/GridDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { TextDemo } from './utilities/TextDemo';
import { Calendar } from './pages/Calendar';
import { SpacingDemo } from './utilities/SpacingDemo';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';
import { Documentation } from './components/Documentation';

const App = () => {
    
    const [layoutMode, setLayoutMode] = useState('static');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [layoutColorMode, setLayoutColorMode] = useState('dark');
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    
    const onMenuItemClick = ( item: MenuItem ) => {
        if (!item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    
    const addClass = (element: HTMLElement, className: string ) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element: HTMLElement, className: string ) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

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

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

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

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';
    
    return (
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenu={onToggleMenu} />
                <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                    <div className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo">
                            <img alt="Logo" src={logo} height="25%" width="25%"  />
                        </div>
                        <AppProfile />
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                    </div>
                </CSSTransition>

                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/formlayout" component={FormLayoutDemo} />
                    <Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/file" component={FileDemo} />
                    <Route path="/chart" component={ChartDemo} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/display" component={DisplayDemo} />
                    <Route path="/elevation" component={ElevationDemo} />
                    <Route path="/flexbox" component={FlexBoxDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/grid" component={GridDemo} />
                    <Route path="/spacing" component={SpacingDemo} />
                    <Route path="/typography" component={TypographyDemo} />
                    <Route path="/text" component={TextDemo} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/documentation" component={Documentation} />
                </div>

                <AppFooter />
            </div>
    );//END return()
}
export default App;
  