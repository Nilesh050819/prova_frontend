
import { Link,useNavigate } from "react-router-dom";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SideNavData = [
  
  {
    title: 'Home',
    path: '/',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
   
  },
  {
      title: 'Drawings',
      path: '#',
      
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
      {
        title: 'Civil',
        path: '/drawings',
        iconClosed: <IoIcons.IoIosPaper />,

      },
      {
        title: 'Furniture',
        path: '/drawings/furniture',
        iconClosed: <IoIcons.IoIosPaper />,

      },
      {
        title: 'Electrical',
        path: '/drawings/electrical',
        iconClosed: <IoIcons.IoIosPaper />,

      }
    ]
  },
  {
  title: 'Material Updates',
  path: '/materialUpdates',
  iconClosed: <RiIcons.RiArrowDownSFill />,
  iconOpened: <RiIcons.RiArrowUpSFill />,
 
},
  {
    title: 'Payments',
    path: '#',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
    {
      title: 'Contractor Payment',
      path: '/contractorPayments',
      iconClosed: <IoIcons.IoIosPaper />,

    },
    {
      title: 'Professional Fees',
      path: '/professionalFees',
      iconClosed: <IoIcons.IoIosPaper />,

    }
  ]
},
{
  title: 'Live Feed',
  path: '/liveFeed',
  
 
},
{
  title: 'Profile',
  path: '/profile',
  
}
];


