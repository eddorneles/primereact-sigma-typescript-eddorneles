import React, { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

export interface MenuItem {
    label: string;
    badgeStyleClass?: string,
    icon?: string;
    to?: string;
    items?: MenuItem[];
    badge?: string
    disabled?: boolean;
    target?: string;
    url?: string;
    command?: Function;
}

interface AppSubMenuProps {
    onMenuItemClick: ( item: MenuItem ) => void;
    root: boolean;
    items?: MenuItem[];
    className?:string;
}

const AppSubmenu:React.FC<AppSubMenuProps> = ( subMenuProps: AppSubMenuProps ) => {

    const [activeIndex, setActiveIndex] = useState<number|null>( null );

    const onMenuItemClick = (event: MouseEvent<HTMLAnchorElement>, item:MenuItem, index:number) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex)
            setActiveIndex(null);
        else
            setActiveIndex(index);

        if ( subMenuProps.onMenuItemClick ) {
            subMenuProps.onMenuItemClick(
                item
            );
        }
    }//END onMenuItemClick()

    const renderLinkContent = ( item: MenuItem ) => {
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

        return (
            <React.Fragment>
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {submenuIcon}
                {badge}
            </React.Fragment>
        );
    }

    const renderLink = ( item:MenuItem, index: number ) => {
        let content = renderLinkContent(item);

        if (item.to) {
            return (
                <NavLink activeClassName="active-route" to={item.to} onClick={(event) => 
                        onMenuItemClick(event, item, index)} exact target={item.target}>
                    {content}
                </NavLink>
            )
        }
        else {
            return (
                <a href={item.url} onClick={(event) => onMenuItemClick(event, item, index)} target={item.target}>
                    {content}
                </a>
            );
        }
    }//END renderLink()

    let items = subMenuProps.items && subMenuProps.items.map((item, i) => {
        let active: boolean = activeIndex === i;
        let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active && !item.to });

        return (
            <li className={styleClass} key={i}>
                {item.items && subMenuProps.root === true && <div className='arrow'></div>}
                {renderLink(item, i)}
                <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                    <AppSubmenu items={item.items} onMenuItemClick={subMenuProps.onMenuItemClick} root={false} />
                </CSSTransition>
            </li>
        );
    });

    return items ? <ul className={subMenuProps.className}>{items}</ul> : null;
}

interface AppMenuProps {
    model: MenuItem[];
    onMenuItemClick: ( item: MenuItem ) => void;
}

export const AppMenu: React.FC<AppMenuProps> = ( appMenuProps: AppMenuProps ) => {
    return (
        <div className="layout-menu-container" >
            <AppSubmenu items={appMenuProps.model} className="layout-menu" onMenuItemClick={appMenuProps.onMenuItemClick} root={true} />
        </div>
    );
}