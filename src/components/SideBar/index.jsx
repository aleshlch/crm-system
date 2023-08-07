import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Badge, useTheme, useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types';
import BallotIcon from '@mui/icons-material/Ballot'  
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'  
import PendingIcon from '@mui/icons-material/Pending'  
import NewReleasesIcon from '@mui/icons-material/NewReleases'  
import { product } from '../../data'
import { tokens } from "../../theme"
import { isOpenSidebar } from '../../App'  
import { useContext } from 'react'

const drawerWidth = 200  

const ResponsiveDrawer = (props) => {

  const {numberBadge, filterValue, setFilterValue, window} = props

  const matches = useMediaQuery('(min-width:900px)')

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { sidebarOpen, setSidebarOpen } = useContext(isOpenSidebar)


  const handleClickFilter = (type, value) => {
    const newFilterValue = {...filterValue}
    newFilterValue[type] = value
    setFilterValue(newFilterValue)

    localStorage.setItem('filter', JSON.stringify(newFilterValue))
  }


  const drawer = (
    <>
      <Toolbar variant="dense"/>
      <Divider />
      <List>
        {[{text: 'All status', icon: <BallotIcon/>}, {text: 'New', icon: <NewReleasesIcon/>}, {text: 'In work', icon: <PendingIcon/>}, {text: 'Completed', icon: <AssignmentTurnedInIcon/>}].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => {handleClickFilter('status', item.text)}} selected={item.text === filterValue.status} >
              <ListItemText primary={item.text} />
              <ListItemIcon>
              {item.text === 'New' ? <Badge badgeContent={numberBadge}>{item.icon}</Badge> : item.icon} 
              </ListItemIcon> 
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
          <List>
            {['All products', ...product].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => {handleClickFilter('product', text)}} selected={text === filterValue.product}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    </>
  )  

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
        <Box sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} >
          {!matches ?
          <Drawer
            container={container} 
            variant="temporary"
            open={sidebarOpen}
            onClose={() => {setSidebarOpen(false)}}
            ModalProps={{keepMounted: true,}}
            sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth }}}
          >
            {drawer}
          </Drawer> :
          <Drawer
            variant="permanent"
            sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: colors.primary[400] }}}
            open>
            {drawer}
          </Drawer>}
        </Box>    
  )  
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
}

export default ResponsiveDrawer  
