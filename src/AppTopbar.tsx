import React, { MouseEvent } from 'react';
import { InputText } from 'primereact/inputtext';

interface AppTopbarProps {
    onToggleMenu: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const AppTopbar:React.FC<AppTopbarProps> = ( {onToggleMenu}: AppTopbarProps ) => {
    
    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={ onToggleMenu }>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Events</span>
                    <span className="layout-topbar-icon pi pi-calendar" />
                    <span className="layout-topbar-badge">5</span>
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon pi pi-cog" />
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-user" />
                </button>
            </div>
        </div>
    );
}