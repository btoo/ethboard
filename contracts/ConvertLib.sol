pragma solidity ^0.4.8;
library ConvertLib {
	function convert(uint amount, uint conversionRate) pure public returns (uint convertedAmount) {
		return amount * conversionRate;
	}
}