import React, { Fragment, useState } from 'react'
import Footer from '../components/Footer'
import MetaData from '../components/MetaData'
import NewNavbar from '../components/NewNavbar'
import { Announcement } from '../components/Announcement'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo} from '../redux/callAPI/cartCall'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'

const Title = styled.h1`
  margin: 20px;
  font-size: 40px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`

const ShippingInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CustomOrderButton = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
`

const ShippingInfo = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const {shippingInfo} = useSelector(state => state.cart);

  const [fullName, setFullName] = useState(shippingInfo.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [email, setEmail] = useState(shippingInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const handleClick = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert("Số điện thoại không hợp lệ !!");
      return;
    } 
    dispatch(saveShippingInfo({fullName,address,email,phoneNumber}))
    history("/confirm-order")
  }


  return (
    <Fragment>
      <MetaData title="Thông tin giao hàng"/>
      <NewNavbar/>
      <CheckoutSteps activeStep={0} />
      <Title>Thông tin vận chuyển</Title>
      <ShippingInfoContainer>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch'}
          }}
          noValidate
          autoComplete='off'
        >
          <div>
            <TextField
              required
              label='Họ Tên'
              variant='filled'
              placeholder='Nguyễn Văn A'
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='Địa chỉ'
              variant='filled'
              placeholder='Số X, Đường A, Phường A, Thành phố B, Tỉnh C'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='Email'
              variant='filled'
              placeholder='abc@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='SĐT'
              variant='filled'
              placeholder='09xxxxxxxx'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </Box>
      </ShippingInfoContainer>
      <CustomOrderButton>
        <Button 
          variant='contained'
          onClick={handleClick}
        >Bước tiếp theo</Button>
      </CustomOrderButton>
    </Fragment>
  );
}

export default ShippingInfo