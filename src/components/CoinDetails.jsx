import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { server } from "../main.jsx";
import Chart from "./Chart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [chartData, setChartData] = useState([]);
  let sign;
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1yr", "max"];
  sign = currency == "usd" ? "$" : currency == "inr" ? "₹" : "€";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const { data: chartArr } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        const { data: coinData } = await axios.get(`${server}/coins/${id}`);
        setChartData(chartArr.prices);
        setCoin(coinData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, days]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartData} currency={sign} days={days} />
          </Box>
          <HStack p={6}>
            {btns.map((btn) => (
              <Button
                key={btn}
                colorScheme="pink"
                size={"sm"}
                onClick={(e) => setDays(e.target.innerText)}
                isDisabled={btn == days}
              >
                {btn}
              </Button>
            ))}
          </HStack>
          <Box w={"full"} p={[6, 10]}>
            <RadioGroup
              value={currency}
              onChange={setCurrency}
              p={4}
              mb={"5rem"}
            >
              <HStack spacing={4}>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>
            <Text
              w={"full"}
              textAlign={"center"}
              fontSize={"0.85rem"}
              color={"blackAlpha.600"}
              mb={10}
            >
              Last Updated On {coin.last_updated}
            </Text>
            <Stack>
              <Image src={coin.image.large} w={["4rem", "5rem"]} />
              <VStack alignItems={"flex-start"} gap={0.4}>
                <Text fontSize={"0.9rem"} fontWeight={500}>
                  {coin.name}
                </Text>
                <Text fontSize={"2xl"} fontWeight={500}>
                  {sign}
                  {coin.market_data.current_price[currency]}
                </Text>
                <Stat>
                  <StatHelpText>
                    <StatArrow
                      type={
                        Math.sign(
                          coin.market_data.price_change_percentage_24h
                        ) == "1"
                          ? "increase"
                          : "decrease"
                      }
                    />
                    {coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <Badge
                  bgColor={"blackAlpha.800"}
                  color={"white"}
                  fontSize={"xl"}
                >
                  #{coin.coingecko_rank}
                </Badge>
                <CustomBar
                  value={coin.market_data.current_price[currency]}
                  low={coin.market_data.low_24h[currency]}
                  high={coin.market_data.high_24h[currency]}
                  sign={sign}
                />
              </VStack>
              <Stack mt={10} w={"full"} p={4} gap={4}>
                <Item
                  title="Max Supply"
                  value={coin.market_data.max_supply || "NA"}
                />
                <Item
                  title="Circulating Supply"
                  value={coin.market_data.circulating_supply || "NA"}
                />
                <Item
                  title="Max Cap"
                  value={`${sign}${
                    coin.market_data.market_cap[currency] || "NA"
                  }`}
                />
                <Item
                  title="All Time Low"
                  value={`${sign}${coin.market_data.atl[currency] || "NA"}`}
                />
                <Item
                  title="All Time High"
                  value={`${sign}${coin.market_data.ath[currency] || "NA"}`}
                />
              </Stack>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};
export default CoinDetails;

const CustomBar = ({ value, high, low, sign }) => {
  return (
    <VStack w={"full"}>
      <Progress
        value={((value - low) * 100) / (high - low)}
        colorScheme={"teal"}
        w="full"
      />
      <HStack w={"full"} justifyContent={"space-between"}>
        <Badge fontSize={["sm", "md"]} colorScheme="red">
          {sign}
          {low}
        </Badge>
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge fontSize={["sm", "md"]} colorScheme="green">
          {sign}
          {high}
        </Badge>
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack w={"full"} justifyContent={"space-between"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};
