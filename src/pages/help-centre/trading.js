import React from 'react'
import styled from 'styled-components'
import { Article } from './_article'
import { Text, Header } from 'components/elements/typography'
import { localize, Localize, WithIntl } from 'components/localization'

const TradingWrapper = styled.div`
    max-width: 79.2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    font-size: var(--text-size-s);
    line-height: 1.5;
    padding-left: 2.4rem;
`
const ExternalLink = styled.a`
    text-decoration: none;
    font-size: var(--text-size-s);
    font-weight: bold;
    color: var(--color-red);

    :hover {
        text-decoration: underline;
    }
`
const StyledText = styled(Text)`
    margin-top: 1.7rem;
`
const Forex = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What is forex?')}
        </Header>
        <Text>
            {localize(
                'Forex is the global decentralised market for the buying and selling of currencies.',
            )}
        </Text>
    </TradingWrapper>
)
const Commodities = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are commodities?')}
        </Header>
        <Text>
            {localize(
                'A commodity is either grown or produced naturally in the environment. Examples include crude oil, metals, gold, and silver.',
            )}
        </Text>
    </TradingWrapper>
)
const StockIndices = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are stock indices?')}
        </Header>
        <Text>
            {localize(
                'Stock indices measure the value of a selection of companies in the stock market. This allows investors to see how a particular set of assets is performing.',
            )}
        </Text>
    </TradingWrapper>
)
const TradingPlatforms = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('How many trading platforms do you offer?')}
        </Header>
        <Text>
            {localize(
                'We offer three trading platforms: DTrader, DBot, and DMT5. Each platform caters to a variety of trading styles and experiences, whether you’re a new or seasoned trader.',
            )}
        </Text>
    </TradingWrapper>
)
const AutomateTradingStrategy = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('How can I automate my trading strategy?')}
        </Header>
        <Text>
            {localize(
                'You can create and run your own automated trading strategies with DBot. You can also download ready-made trading robots (also known as Expert Advisors) for DMT5 by going to the ‘Market’ tab in the DMT5 platform.',
            )}
        </Text>
    </TradingWrapper>
)
const TradingLimits = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are my trading limits?')}
        </Header>
        <Text>
            <Localize
                translate_text="You can see your account’s trading limits by going to <0>Settings > Security and safety ></0> <1>Account limits</1>. Please note that if your account balance exceeds the maximum account cash balance, you must withdraw funds from your account to bring your account balance below the maximum limit."
                components={[
                    <strong key={0} />,
                    <ExternalLink
                        href="https://deriv.app/account/account-limits"
                        target="_blank"
                        rel="noopener noreferrer"
                        key={1}
                    />,
                ]}
            />
        </Text>
    </TradingWrapper>
)
const CFD = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are Contracts for Difference (CFDs)?')}
        </Header>
        <Text>
            {localize(
                'A contract for differences (CFD) is a contract that pays the difference between the value of an asset at the time of opening a trade and its value at closing the trade.',
            )}
        </Text>
    </TradingWrapper>
)
const SyntheticIndices = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are synthetic indices?')}
        </Header>
        <Text>
            {localize(
                'Exclusive to Deriv, Synthetic Indices are our very own set of synthetic markets engineered to simulate real-world market movements, unaffected by the sways of actual events and other outside disruptions.',
            )}
        </Text>
    </TradingWrapper>
)
const BinaryOptions = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What are binary options?')}
        </Header>
        <Text>
            {localize(
                'A binary option is a financial instrument with a fixed payout where you predict the outcome from only two possible results. ',
            )}
        </Text>
    </TradingWrapper>
)
const WeekendContracts = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('What contracts are available for trading on weekends?')}
        </Header>
        <Text>
            {localize(
                'You can trade Volatility Indices 24/7 in all countries except Australia, France, Germany, Greece, Italy, Luxembourg, Singapore, and Spain due to regulatory requirements.',
            )}
        </Text>
    </TradingWrapper>
)
const LearnToTrade = () => (
    <TradingWrapper>
        <Header as="h4" margin=" 0 0 2.4rem 0" lh="1.5">
            {localize('How can I learn to trade?')}
        </Header>
        <Text>
            {localize(
                'You may open a demo account to familiarise yourself with the platforms, products, and markets that we offer.',
            )}
        </Text>
        <StyledText>
            {localize(
                'You may open a demo account to familiarise yourself with the platforms, products, and markets that we offer.',
            )}
        </StyledText>
    </TradingWrapper>
)

const TradingArticle = () => {
    return (
        <Article header="Trading">
            <Forex text={localize('What is forex?')} label="what-is-forex" />
            <Commodities text={localize('What are commodities?')} label="what-are-commodities" />
            <StockIndices
                text={localize('What are stock indices?')}
                label="what-are-stock-indices"
            />
            <TradingPlatforms
                text={localize('How many trading platforms do you offer?')}
                label="how-many-trading-platforms"
            />
            <AutomateTradingStrategy
                text={localize('How can I automate my trading strategy?')}
                label="how-to-automate-trading-strategy"
            />
            <TradingLimits text={localize('What are my trading limits?')} label="trading-limits" />
            <CFD
                text={localize('What are Contracts for Difference (CFDs)?')}
                label="what-are-cfds"
            />
            <SyntheticIndices
                text={localize('What are synthetic indices?')}
                label="what-are-synthetic-indices"
            />
            <BinaryOptions
                text={localize('What are binary options?')}
                label="what-are-binary-options"
            />
            <WeekendContracts
                text={localize('What contracts are available for trading on weekends?')}
                label="contracts-available-on-weekends"
            />
            <LearnToTrade text={localize('How can I learn to trade?')} label="learn-to-trade" />
        </Article>
    )
}

export default WithIntl()(TradingArticle)