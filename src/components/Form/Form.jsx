import { Container, Paper, Typography, TextField, MenuItem, Button, useTheme } from "@mui/material"
import { useState } from "react"
import { serverPath } from "../../healpers/serverPath"
import { product } from "../../data"
import { tokens } from "../../theme"



const Form = () => {

    const theme = useTheme()  
    const colors = tokens(theme.palette.mode)  

    const [newRequest, setNewRequest] = useState({
        name: '',
        email: '',
        product: 'Html course',
        date:new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: 'New'})


        const onChangeData = (e) => {
            setNewRequest((oldRequest) => {
            const request = {...oldRequest}
            request[e.target.name] = e.target.value
            return request
            })
        }

        const onSubmit = (e) => {
            e.preventDefault()
            fetch(serverPath + 'requests', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRequest)
            }).then(() => {
                setNewRequest({
                name: '',
                email: '', 
                product: 'Html course'
                })
            })
        }

    return ( 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 48px)' }}>
            <Container maxWidth="sm">
                <Paper component="form" elevation={5} sx={{ p: 3, backgroundColor: colors.primary[500] }} onSubmit={(e) => {onSubmit(e)}}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>Client's information</Typography>
                    <TextField
                        required
                        name="name"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={newRequest.name}
                        onChange={(e) => {onChangeData(e)}}
                        sx={{ mb: 2 }} 
                    />
                    <TextField
                        required
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={newRequest.email}
                        onChange={(e) => {onChangeData(e)}}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="product"
                        select
                        label="Select product"
                        defaultValue={newRequest.product}
                        value={newRequest.product}
                        fullWidth
                        onChange={(e) => {onChangeData(e)}}
                        sx={{ mb: 3 }}
                        >
                        {product.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                    >Submit</Button>

                </Paper>
            </Container>
        </div>
     )  
}
 
export default Form  