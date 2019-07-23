import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import Button from './button'
import Input from './input'
import Row from '../containers/row'
import Facebook from 'images/svg/facebook.svg'
import Google from 'images/svg/google.svg'
import { Header, Text } from '../elements/typography'
import ErrorIcon from 'images/svg/error-icon.svg'
import { localize } from '../localization'
import TrafficSource from 'common/traffic-source'
import { LocalStore } from 'common/storage'
import { BinarySocketBase } from 'common/websocket/socket_base'
import Image from '../elements/image'
import Login from 'common/login'
import Wrapper from '../containers/wrapper'
import Container from '../containers/container'
import PropTypes from 'prop-types'

const Title = styled(Header)`
    margin: 10rem 0 3rem 0;
`
const Form = styled.form`
    width: 80%;
    margin: 0 auto;
`
const ResponseWrapper = styled(Container)`
    justify-content: center;
    max-width: 26.5rem;
    flex-direction: column;
    padding: 2rem 1rem;
`
const InputGroup = styled.div`
    position: relative;
    width: 100%;
    margin: var(--text-size-m) 0;
`
const EmailButton = styled(Button)`
    width: 100%;
    font-size: var(--text-size-s);
    margin-bottom: 4rem;
`

const StyledError = styled(ErrorIcon)`
    position: absolute;
    right: 0.8rem;
    top: 1.2rem;
    height: 1.6rem;
    width: 1.6rem;
`

const ErrorMessages = styled(Text)`
    padding-left: 0.8rem;
    font-size: 1.2rem;
`
const SocialButton = styled(Button)`
    box-shadow: none;
    flex: inherit !important;
    width: 48%;
    background: ${props => {
        if (props.provider === 'google') return 'var(--color-white)'
        if (props.provider === 'facebook') return 'var(--color-blue)'
    }};
    padding: 1rem;

    svg {
        width: 2.2rem;
        height: 2.2rem;
    }
`
const MutedText = styled(Text)`
    text-align: left;
    color: var(--color-grey);
    align-self: start;
`
const SocialWrapper = styled(Row)`
    width: 100%;
    justify-content: space-between;
    margin-top: var(--text-size-s);
    margin-bottom: 4rem;
`
const LoginText = styled(MutedText)`
    text-align: center;
    align-self: center;
    margin-bottom: 8rem;
`
const LoginLink = styled.a`
    color: var(--color-red);
    text-decoration: none;
    cursor: pointer;
`

const EmailImgWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
`

const validateEmail = email => {
    const required = email.length
    const valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(
        email,
    )

    if (!required) return localize('Email is required')
    if (!valid) return localize('Invalid email address')

    return null
}

class Signup extends Component {
    state = {
        email: '',
        is_submitting: false,
        email_error_msg: '',
        submit_status: '',
        submit_error_msg: '',
    }

    handleValidation = param => {
        if (!param) return

        const message = typeof param === 'object' ? param.target.value : param

        this.setState({
            email_error_msg: validateEmail(message),
        })
    }

    handleInputChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value,
        })

        this.handleValidation(value)
    }

    getVerifyEmailRequest = email => {
        const utm_data = TrafficSource.getData()
        const affiliate_token = Cookies.getJSON('affiliate_tracking')
        const signup_device = LocalStore.get('signup_device')
        const date_first_contact = LocalStore.get('date_first_contact')

        return {
            verify_email: email,
            type: 'account_opening',
            url_parameters: {
                utm_source: TrafficSource.getSource(utm_data),
                ...(utm_data.utm_campaign && {
                    utm_medium: utm_data.utm_medium,
                    utm_campaign: utm_data.utm_campaign,
                }),
                ...(affiliate_token && { affiliate_token: affiliate_token.t }),
                ...(signup_device && { signup_device: signup_device }),
                ...(date_first_contact && {
                    date_first_contact: date_first_contact,
                }),
            },
        }
    }

    handleEmailSignup = e => {
        e.preventDefault()
        this.setState({ is_submitting: true })
        this.handleValidation(this.state.email)

        if (this.state.email_error_msg) {
            return this.setState({ is_submitting: false })
        }

        const { email } = this.state
        const verify_email_req = this.getVerifyEmailRequest(email)

        BinarySocketBase.send(verify_email_req).then(response => {
            if (response.error) {
                return this.setState({
                    is_submitting: false,
                    submit_status: 'error',
                    submit_error_msg: response.error.message,
                })
            }

            this.setState({
                is_submitting: false,
                submit_status: 'success',
            })
        })
    }

    handleSocialSignup = e => {
        e.preventDefault()
        Login.initOneAll(e.target.id)
    }

    handleLogin = e => {
        e.preventDefault()
        Login.redirectToLogin()
    }

    render() {
        return (
            <>
                {!this.state.submit_status && (
                    <Form onSubmit={this.handleEmailSignup} noValidate>
                        <Title as="h3" weight="normal">
                            {localize('Sign up for free now!')}
                        </Title>
                        <InputGroup>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                value={this.state.email}
                                label={localize('Email')}
                                placeholder={'example@mail.com'}
                                onChange={this.handleInputChange}
                                onBlur={this.handleValidation}
                                autoFocus={this.props.autofocus || true}
                                required
                            />
                            {this.state.email_error_msg && (
                                <>
                                    <ErrorMessages
                                        lh="1.4"
                                        align="left"
                                        color="red-1"
                                    >
                                        {this.state.email_error_msg}
                                    </ErrorMessages>
                                    <StyledError />
                                </>
                            )}
                        </InputGroup>
                        <EmailButton
                            type="submit"
                            secondary
                            disabled={this.state.is_submitting}
                        >
                            {localize('Create a free account')}
                        </EmailButton>
                        <Text color="grey" className='social-signup'>{localize('Or sign up with')}</Text>
                        <SocialWrapper>
                            <SocialButton
                                onClick={this.handleSocialSignup}
                                provider="google"
                                id="google"
                                type="button"
                                secondary
                            >
                                <span>
                                    <Google />
                                </span>
                            </SocialButton>
                            <SocialButton
                                onClick={this.handleSocialSignup}
                                provider="facebook"
                                id="facebook"
                                type="button"
                                secondary
                            >
                                <span>
                                    <Facebook />
                                </span>
                            </SocialButton>
                        </SocialWrapper>
                        <LoginText className='already'>
                            {localize('Already have an account?')}
                            <LoginLink onClick={this.handleLogin}>
                                {' '}
                                {localize('Log in.')}
                            </LoginLink>
                        </LoginText>
                    </Form>
                )}
                {this.state.submit_status === 'success' && (
                    <ResponseWrapper>
                        <Header as="h3" align="center" weight="normal">
                            {localize('Check your email')}
                        </Header>
                        <EmailImgWrapper
                            width="100%"
                            margin={{ top: '2.2rem', bottom: '1.6rem' }}
                        >
                            <Image
                                img_name="open-email.png"
                                alt="Email image"
                                width="80%"
                            />
                        </EmailImgWrapper>
                        <Text align="center">
                            {localize(
                                'Please check your email and click on the link provided to verify your email address.',
                            )}
                        </Text>
                    </ResponseWrapper>
                )}
                {this.state.submit_status === 'error' &&
                    this.state.submit_error_msg && (
                        <ResponseWrapper>
                            <Text align="center">
                                {this.state.submit_error_msg}
                            </Text>
                        </ResponseWrapper>
                    )}
            </>
        )
    }
}

Signup.propTypes = {
    autofocus: PropTypes.string,
}

export default Signup