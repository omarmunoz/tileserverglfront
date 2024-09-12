import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFileArchive, FaRegListAlt, FaUserEdit, FaRegUserCircle } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import './sidebar.css';

import { Link } from "react-router-dom";

const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const username = localStorage.getItem('username');
  // added styles 
  const styles = {
    sideBarHeight: {
      height: "100vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem  icon={<FaFileArchive />}><Link to="/">Mis archivos</Link></MenuItem>
        <MenuItem icon={<FaUserEdit />} ><Link to="/adminusuarios">Administrar usuarios</Link></MenuItem>
        <MenuItem icon={<FaRegUserCircle />} ><Link to="/micuenta">Cuenta</Link></MenuItem>
        <SubMenu title="Email" >
          <MenuItem>Notification</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default SideNavigation;