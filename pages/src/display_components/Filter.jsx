import {React, useState} from 'react'
import {Fade, Menu, MenuItem, Button, Typography} from "@mui/material"

function Filter() {
    const filter_values = ['Weekly', 'Monthly', 'Yearly']
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState('Filter')
    const open = Boolean(anchorEl)
    return (
        <div>
            <Button
                variant = "outlined"
                className="text-input"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                text={filter}
                value ={filter}
                >
                    {filter}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                "aria-labelledby": "fade-button"
                }}
                anchorEl={anchorEl}
                open={open}
                
                TransitionComponent={Fade}>
      
            {filter_values.map(category => (
                <MenuItem>{category}</MenuItem>
            ))}
            </Menu>
        </div>
  )
}

export default Filter