import React, {useEffect,useState} from 'react';
import { Link,useNavigate } from "react-router-dom";
import styled from 'styled-components';



const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height:60px;
    text-decoration: none;
    font-size: 18px;
    width:200px;
    
    &:hover{
      background: #252831;
      border-left: 4px solid #632ce4;
      cursor: poiner;
    }
      
`;



const SidebarLabel = styled.span`
  margin-left: 16px;
`;
const DropdownLink = styled(Link)`
  backgroud: #414757;
  display: flex;
    color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding-left: 3rem;
    list-style: none;
    height:60px;
    text-decoration: none;
    font-size: 18px;
    
    &:hover{
      background: #632ce4;
      cursor: poiner;
    }
`;
const Submenu = ({ item,sidebar }) => {

  const [subnav,setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  

  
 
  
  return (
    <>
    
    <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
      <div>
        {item.icon}
        {sidebar &&  (
        <div className="image">
          <img className="prova" alt="Prova" src="./assets/images/prova-logo.svg" />
        </div>
        )}
        <SidebarLabel>{item.title}</SidebarLabel>
      </div>
      <div>

    

        {item.subNav && subnav

          ? item.iconOpened
          : item.subNav
          ? item.iconClosed
          : null

        
        
        }
      </div>
      
    </SidebarLink>
        {subnav && item.subNav.map((item, index) => {
          return (
              <DropdownLink to={item.path} onClick={item.onClick}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
          )
        })}

    </>
  );
};

export default Submenu;
