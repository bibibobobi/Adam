import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div`
  margin-top: 48px;
  width: 100%;
`
const Note = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`

const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

const FormInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px; /* Safari 12+ */
    grid-gap: 16px; /* Safari 10-11 */
  }
`
const PhoneExtInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 80px; /* Divide the space: phone - dash - phoneExt */
  align-items: center;

  ${({ theme }) => theme.breakpoint.lg} {
    padding-right: 142px;
  }

  span {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
    margin: 0 12px;
    margin-top: 56px;
  }
`
const CheckBoxWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  margin-bottom: -8px;

  input {
    width: 20px;
    height: 20px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
    font-weight: 400;
    margin-right: 8px;

    /* Hide the default checkbox appearance */
    appearance: none;
    -webkit-appearance: none;

    /* Custom checkbox styles */
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    :hover {
      border: 2px solid rgba(0, 0, 0, 0.87);
    }

    &:checked::before {
      content: '';
      display: inline-block;
      width: 26px;
      height: 26px;
      background-image: url('/images/checkbox-active.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: -5px;
      left: -5px;
      /* Change the fill color when checked and hovered */
      filter: brightness(1.1);
    }
    /* Change the fill color when hovered */
    &:hover::before {
      filter: brightness(1.5);
    }
  }

  label {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
  }
`

export default function Recipient({
  recipientValues,
  setRecipientValues,
  sameAsOrderer,
  setSameAsOrderer,
  ordererValues,
}) {
  const handleCheckboxChange = () => {
    if (sameAsOrderer) {
      setRecipientValues(ordererValues)
    } else {
      setRecipientValues({
        username: '',
        cellphone: '',
        phone: '',
        phoneExt: '',
        address: '',
      })
    }
    setSameAsOrderer(!sameAsOrderer)
  }

  const formValues = sameAsOrderer ? ordererValues : recipientValues

  const handleChange = (e) => {
    const { name, value } = e.target
    const newValues = { ...formValues, [name]: value }
    setRecipientValues(newValues)
  }

  return (
    <Wrapper>
      <Title>收件人</Title>
      <Note>資料請務必正確填寫，以利雜誌寄送。</Note>

      <CheckBoxWrapper>
        <input
          type="checkbox"
          checked={sameAsOrderer}
          onChange={handleCheckboxChange}
        />
        <label>同訂購人資訊</label>
      </CheckBoxWrapper>

      <FormInputsWrapper>
        <FormInput
          name="username"
          type="text"
          label="姓名"
          placeholder="收件人姓名"
          value={formValues.username}
          onChange={handleChange}
          disabled={sameAsOrderer}
          errorMessage="收件人姓名不可空白"
          required
          sameAsOrderer={sameAsOrderer}
        />
        <FormInput
          name="cellphone"
          type="text"
          label="手機"
          placeholder="0912345678"
          value={formValues.cellphone}
          onChange={handleChange}
          disabled={sameAsOrderer}
          errorMessage="請輸入有效的聯絡電話"
          required
          pattern="09[0-9]{8}" // Match "09" followed by exactly 8 more digits
          sameAsOrderer={sameAsOrderer}
        />
      </FormInputsWrapper>
      <PhoneExtInputWrapper>
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={formValues.phone}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
        <span>-</span>
        <FormInput
          name="phoneExt"
          type="text"
          label="&nbsp;"
          placeholder="分機"
          value={formValues.phoneExt}
          onChange={handleChange}
          disabled={sameAsOrderer}
          style={{ width: '80px' }}
        />
      </PhoneExtInputWrapper>
      <FormInput
        name="address"
        type="text"
        label="收件地址"
        placeholder="收件人通訊地址"
        value={formValues.address}
        onChange={handleChange}
        disabled={sameAsOrderer}
        errorMessage="收件地址不可空白"
        required
        sameAsOrderer={sameAsOrderer}
      />
    </Wrapper>
  )
}
