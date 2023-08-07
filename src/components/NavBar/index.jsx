import { Button, AppBar, Toolbar, useTheme } from '@mui/material'
import { useContext } from 'react'  
import { ColorModeContext } from "../../theme"
import MenuIcon from '@mui/icons-material/Menu'  
import IconButton from '@mui/material/IconButton'  
import AddIcon from '@mui/icons-material/Add'  
import TocIcon from '@mui/icons-material/Toc'  
import LightModeIcon from '@mui/icons-material/LightMode'  
import DarkModeIcon from '@mui/icons-material/DarkMode'  
import { Link, useLocation } from 'react-router-dom'  
import { isOpenSidebar } from '../../App'  



const Navbar = () => {

  const theme = useTheme()  
  const colorMode = useContext(ColorModeContext)

  const { setSidebarOpen } = useContext(isOpenSidebar)

  const location = useLocation()
  const isTable = location.pathname === '/table'
  const appBarWidth = isTable ? 'calc(100% - 200px)' : '100%'
  const displayBurger = isTable ? {md: 'none'} : {xs: 'none'} 


    return (
        <AppBar position="static" sx={{ width: { md: appBarWidth }, ml: { md: isTable ? '200px' : 0 }}}>
          <Toolbar variant="dense" sx={{justifyContent: 'space-between', alignItems: 'center', p: 0}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setSidebarOpen((sidebarOpen) => !sidebarOpen)}
              sx={{ ml: 0, display: displayBurger}}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <Button component={Link} to={'/'}  startIcon={<AddIcon />}>Add request</Button>
                <Button component={Link} to={'/table'}  endIcon={<TocIcon />}>Catalog</Button>
            </div>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon/>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
    )  
}
 
export default Navbar  