/**
 *Submitted for verification at BscScan.com on 2022-01-24
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

 //IERC20Metadata
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

/*abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}*/

//////Pancake
    interface IPancakeFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}

interface IPancakePair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    function kLast() external view returns (uint);

 //   function mint(address to) external returns (uint liquidity);
 //   function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
 //   function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

interface IPancakeRouter01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
    external
    payable
    returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
    external
    returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    external
    returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
    external
    payable
    returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

library Address {

    function isContract(address account) internal view returns (bool) {

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verifies that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

contract TestVC {

event DEPOSIT(address OWNER, uint VALUE);
event WITHDRAW(address OWNER, uint VALUE);
event TARGET_REACHED(uint VALUE);

     //TestNet BSC   
    address constant routerAddress=0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3;
    //MainNet BSC
  //  address constant routerAddress=0x10ED43C718714eb63d5aA57B78B54704E256024E;
   
    IPancakeRouter02 private _pancakeRouter;
  //  address public _pancakePairAddress;
    address public MainWallet; //address of the wallet that controls the contract
     address public WorkHelperWallet; //address of the wallet used for automating tasks in the future. Has admin privelages
 //   address public BankWallet;
  //  address public PayoutContract;
    address  public USDContract;

  //  bool public AcceptingDeposits;
  //  bool public ClaimsEnabled;
  //  bool public TargetReached;
    bool public AutoSwapEnabled;
    bool distributeAtEthDeposit;
    bool distributeAtUSDDeposit;
   // uint minInvestment; //USD value
   // uint maxInvestment; //USD value
   // uint investmentGoal; //USD value
    uint maxGoalExceedance; //USD value
    uint GrandTotalInvested;
    uint USDdecimals;
    uint64 public DisplayFromID;

//mapping (address => mapping (address => uint)) private __allowances;


 //   mapping(address => uint256) public balanceUSD;
  //  mapping(address => uint256) public tokensReceived;
  //  mapping(uint256 => address) public investorID;

    

/*    struct SaleInfo { 
     string SaleName;
     string logoURL;
     address payoutToken;
     address BankWallet;

     uint64 minInvestment;
     uint64 maxInvestment;
     uint64 InvestmentGoal;

     bool AcceptingDeposits;
     bool isActive;
}*/

 /*   struct Sale { 

     uint64 starttime;
     uint64 endtime;
     
     uint256 TokensClaimed; //claimed tokens
     uint256 TotalTokens; //original token deposit amount
     uint256 totalInvested; //BUSD invested

    uint64 N_Investors;  
    uint64 SaleID;
}*/
//mapping(uint64 => Sale) public Sales;
//mapping(uint64 => SaleInfo) public SalesInfo;

mapping (address => mapping (uint64 => uint256)) public _balanceUSD;
mapping (address => mapping (uint64 => uint256)) public _tokensReceived;
mapping (uint64 => mapping (uint64 => address)) public _investorID;


     mapping(uint64 => string) SaleName;
     mapping(uint64 => string) logoURL;
     mapping(uint64 => address) payoutToken;
     mapping(uint64 => address) BankWallet;

     mapping(uint64 => uint256) minInvestment;
     mapping(uint64 => uint256) maxInvestment;
     mapping(uint64 => uint256) InvestmentGoal;

     mapping(uint64 => bool) AcceptingDeposits;
     mapping(uint64 => bool) ClaimsEnabled;
     mapping(uint64 => bool) isActive;

     mapping(uint64 => uint256) starttime;
     mapping(uint64 => uint256) endtime;
     
     mapping(uint64 => uint256) TokensClaimed; //claimed tokens
     mapping(uint64 => uint256) TotalTokens; //original token deposit amount
     mapping(uint64 => uint256) totalInvested; //BUSD invested

    mapping(uint64 => uint64) N_Investors;  
    mapping(uint64 => uint64) SaleID;
    mapping(uint64 => bool) TargetReached;

    IERC20 USD; 
    IERC20 PayoutToken;
    constructor() {
        _pancakeRouter = IPancakeRouter02(routerAddress);
 //      PayoutContract[0] = 0x8BaBbB98678facC7342735486C851ABD7A0d17Ca; // testnet ETH
   //     PayoutToken = IERC20(PayoutContract);

    //Default values
 /*   AcceptingDeposits = true;
    ClaimsEnabled = false;
    TargetReached = false;
    AutoSwapEnabled = true;
    distributeAtEthDeposit = true;
    distributeAtUSDDeposit = true;
    minInvestment = 1 * 10 ** 18; //USD value
    maxInvestment = 10000 * 10 ** 18; //USD value
    investmentGoal = 109000 * 10 ** 18; //USD value
    maxGoalExceedance = 500 * 10 ** 18; //USD value
    totalInvested = 0;
    USDdecimals = 18;
*/
    maxGoalExceedance = 500 * 10 ** 18; //USD value
    distributeAtEthDeposit = true;
    distributeAtUSDDeposit = true;
    USDdecimals = 18;
    AutoSwapEnabled = true;
//All control given to the contract creator
        MainWallet = msg.sender;
        WorkHelperWallet = msg.sender;
        BankWallet[0] = msg.sender;

   //TestNet BSC BUSD
        USDContract = 0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7;

        USD = IERC20(USDContract); 
    }

   //Admin reserved functions use this modifier. Similar to Ownership in some ERC20 contracts
    modifier onlyMain() {
      require((msg.sender == MainWallet)||(msg.sender == WorkHelperWallet));
      _;
   }    



   function StartNewProject(string memory ProjectName, string memory LogoURL, uint minimumInvestmentUSD, uint maximumInvestmentUSD, 
        uint256 InvestmentGoalUSD, address PayoutTokenAddr, address BankWalletAddr, uint256 DelaybeforeStart_h, uint256 Duration_h) public onlyMain()
   {
    uint64 ProjectID = NewestProjectID;   
    
    SaleID[ProjectID] = ProjectID;
    SaleName[ProjectID] = ProjectName;
    logoURL[ProjectID] = LogoURL;
    payoutToken[ProjectID] = PayoutTokenAddr;
    BankWallet[ProjectID] = BankWalletAddr;

    minInvestment[ProjectID] = minimumInvestmentUSD * 10 ** 18; //USD value
    maxInvestment[ProjectID] = maximumInvestmentUSD * 10 ** 18; //USD value
    InvestmentGoal[ProjectID] = InvestmentGoalUSD * 10 ** 18; //USD value

    isActive[ProjectID] = true;

 if(DelaybeforeStart_h==0)
    AcceptingDeposits[ProjectID] = true;
   starttime[ProjectID] = block.timestamp + DelaybeforeStart_h * 3600;
 
    endtime[ProjectID] = starttime[ProjectID] + Duration_h * 3600;
     
    NewestProjectID++;
   }
         //function to change payout currency
         function setPayoutContract(uint64 ProjectID, address addr) public onlyMain()
       {  
          //PayoutContract = addr; 
          payoutToken[ProjectID] = addr;
         // PayoutToken = IERC20(addr);
       }

    //function to hide old / completed projects from dapp interface
         function setDisplayFromID(uint64 startPos) public onlyMain()
       {  
          DisplayFromID = startPos;
       }

         function setUSDContract(address addr) public onlyMain()
       {  
          USDContract = addr; 
          USD = IERC20(addr);
       }

       function getPayoutName(uint64 ProjectID) public view returns (string memory)
       { 
         return IERC20(payoutToken[ProjectID]).name();
       }

       function getPayoutSymbol(uint64 ProjectID) public view returns (string memory)
       {
         return IERC20(payoutToken[ProjectID]).symbol();
       }

       function getPayoutDecimals(uint64 ProjectID) public view returns (uint8)
       {
         return IERC20(payoutToken[ProjectID]).decimals();
       }
       
        function setMainWallet(address addr) public onlyMain()
       {  
          if(MainWallet != address(0))
          MainWallet = addr; 
       }
       
         function setHelperWallet(address addr) public onlyMain()
       {  
          WorkHelperWallet = addr;
       }

         function setMinInvestment(uint64 ProjectID, uint USDvalue) public onlyMain()
       {  
          minInvestment[ProjectID] = USDvalue * (10**USDdecimals);
       }

         function getMinInvestment(uint64 ProjectID) public view returns (uint)
       {  
          return minInvestment[ProjectID] / (10**USDdecimals);
       }

         function setMaxInvestment(uint64 ProjectID, uint USDvalue) public onlyMain()
       {  
          maxInvestment[ProjectID] = USDvalue * (10**USDdecimals);
       }
       

        function getMaxInvestment(uint64 ProjectID) public view returns (uint)
       {  
          return maxInvestment[ProjectID] / (10**USDdecimals);
       }

         function setmaxGoalExceedance(uint USDvalue) public onlyMain()
       {  
          maxGoalExceedance = USDvalue * (10**USDdecimals);
       }

        function setdistributeAtEthDeposit(bool enabled) public onlyMain()
       {  
          distributeAtEthDeposit = enabled;
       }

       function setdistributeAtUSDDeposit(bool enabled) public onlyMain()
       {  
          distributeAtUSDDeposit = enabled;
       }

       function getmaxGoalExceedance() public view returns (uint)
       {  
          return maxGoalExceedance / (10**USDdecimals);
       }
      
         function setInvestmentGoal(uint64 ProjectID, uint USDvalue) public onlyMain()
       {  
          InvestmentGoal[ProjectID] = USDvalue * (10**USDdecimals);
       }
       
        function getInvestmentGoal(uint64 ProjectID) public view returns (uint)
       {  
          return InvestmentGoal[ProjectID] / (10**USDdecimals);
       }

        function getUSDInvested(uint64 ProjectID) public view returns (uint)
       {  
          return totalInvested[ProjectID] / (10**USDdecimals);
       }

        function getTokensPaidOut(uint64 ProjectID) public view returns (uint)
       {  
          return TokensClaimed[ProjectID];
       }

        function getTotalTokens(uint64 ProjectID) public view returns (uint)
       {  
          return TotalTokens[ProjectID];
       }

       function getPercInvested(uint64 ProjectID) public view returns (uint)
       {  
          return 100 * totalInvested[ProjectID] / InvestmentGoal[ProjectID];
       }

         function setUSDdecimals(uint dec) public onlyMain()
       {  
          USDdecimals = dec;
       }

         function enableDeposits(uint64 ProjectID) public onlyMain()
       {  
          AcceptingDeposits[ProjectID] = true;
       }

         function enableAutoSwap() public onlyMain()
       {  
          AutoSwapEnabled = true;
       }

         function disableAutoSwap() public onlyMain()
       {  
          AutoSwapEnabled = false;
       }

         function setProjectVisibility(uint64 ProjectID, bool isVisible) public onlyMain()
       {  
          isActive[ProjectID] = isVisible;
       }

         function disableDeposits(uint64 ProjectID) public onlyMain()
       {  
          AcceptingDeposits[ProjectID] = false;
       }

    function getDepositedUSD(uint64 ProjectID,address holder) public view returns (uint)
       {  
          return _balanceUSD[holder][ProjectID] / (10**USDdecimals);
       }

        function gettokensReceived(uint64 ProjectID,address holder) public view returns (uint)
       {  
          return _tokensReceived[holder][ProjectID] / (10**USDdecimals);
       }

         function getclaimableTokens(uint64 ProjectID,address holder) public view returns (uint)
       {  uint256 balance = getDepositedUSD(ProjectID,holder);
          uint256 Tokens = getTotalTokens(ProjectID); 
          uint256 TotalUSD = getUSDInvested(ProjectID);
            if((balance == 0)||(Tokens == 0))
            return 0;
            else
            return Tokens * balance / TotalUSD;
       }

         function getInvestorID(uint64 ProjectID, uint64 Num) public view returns (address)
       {  
          return _investorID[ProjectID][Num];
       }     

       
//Returns the USD value of ETH tokens to calculate investor share
   function getTokenprice(uint amountBNB) public view returns (uint256)
{
     address[] memory path = new address[](2);
        path[0] = _pancakeRouter.WETH();
        path[1] = address(USDContract);
       uint[] memory amounts =  _pancakeRouter.getAmountsOut(amountBNB, path);
        
       
    return amounts[1];    
}
 
function getCountDown(uint64 ProjectID) public view returns (uint256 Days, uint256 Hours, uint256 Minutes){
        uint256 currentTime = block.timestamp;
        uint256 endTime = endtime[ProjectID];
        
        if(currentTime < endTime)
         {
            uint256 RemainingTime = endTime - currentTime;
            Days = RemainingTime / 86400;
            Hours = RemainingTime / 3600 - Days*24;
            Minutes = RemainingTime / 60 - (Hours+Days*24)*60;
    
         }
         else
         {   
             Days = 0;
             Hours = 0;
             Minutes = 0;
         }
         
         return (Days, Hours, Minutes);
    }

 function getActiveProjects() public view returns (uint64 pos, uint64[] memory IDlist) 
 { 
     for(uint64 i = 0; i<NewestProjectID; i++)
     {if(isActive[i])
      IDlist[pos] = i;
      pos++;
     }
     return (pos, IDlist);
 }

 function getProjectName(uint64 ProjectID) public view returns (string memory)
 {
     return SaleName[ProjectID];
 }

  function getProjectLogo(uint64 ProjectID) public view returns (string memory)
 {
     return logoURL[ProjectID];
 }

 

   function getProjectStatus(uint64 ProjectID) public view returns (string memory)
 {
     if(isActive[ProjectID])
      {  if(ClaimsEnabled[ProjectID])
          return "Claim Tokens";
          else
          if(AcceptingDeposits[ProjectID])
          return "Accepting Investments";
          else
          if(TargetReached[ProjectID])
          return "Target Reached";
          else
          return "Pending";
      }
      else
      return "Complete";
 }

function getClaimStatus(uint64 ProjectID) public view returns (bool)
{
    return AcceptingDeposits[ProjectID];
}

function getInvestStatus(uint64 ProjectID) public view returns (bool)
{
   return ClaimsEnabled[ProjectID];
}

function getProjectDetails(uint64 ProjectID) public view returns (string memory name,string memory logo,string memory status,uint [] memory details){
    name = SaleName[ProjectID];
    logo = logoURL[ProjectID];
    status = getProjectStatus(ProjectID);
    details[0] = totalInvested[ProjectID] / (10**USDdecimals);
    details[1] = 100 * totalInvested[ProjectID] / InvestmentGoal[ProjectID];
    details[2] = InvestmentGoal[ProjectID] / (10**USDdecimals);
    details[3] = TokensClaimed[ProjectID];
    details[4] = TotalTokens[ProjectID];
    details[5] = minInvestment[ProjectID] / (10**USDdecimals);
    details[6] = maxInvestment[ProjectID] / (10**USDdecimals);
    details[7] = endtime[ProjectID] - block.timestamp;
    details[8] = IERC20(payoutToken[ProjectID]).decimals();
}





// function to receive blockchain native currency directly (BNB, ETH, FTM etc.)
//To send USD tokens instead, use the DepositUSD function

uint64 NewestProjectID;
receive () external payable {
        uint64 projectID = NewestProjectID;
        uint64 InvestorCount = N_Investors[projectID];
            if(msg.value > 0)
             {
              require(AcceptingDeposits[projectID], "Deposits closed");
                uint USDvalue = getTokenprice(msg.value); //convert eth/bnb amount to USD value
                require(_balanceUSD[msg.sender][projectID]+USDvalue <= maxInvestment[projectID], "Value exceeds maximum deposit");
                require(USDvalue >= minInvestment[projectID], "Value below minimum deposit");
                if(_balanceUSD[msg.sender][projectID]==0) //new investor
                {
                _investorID[projectID][InvestorCount] = msg.sender;
                N_Investors[projectID]++;
                }

                _balanceUSD[msg.sender][projectID] += USDvalue;
                totalInvested[projectID] += USDvalue;
                
                emit DEPOSIT(msg.sender, USDvalue);

                if(distributeAtEthDeposit)
                    SendDepositsToBankWallet(projectID);

                if(totalInvested[projectID] >= InvestmentGoal[projectID]) //Finalize deposits
                 {
                    TargetReached[projectID] = true;
                     emit TARGET_REACHED(totalInvested[projectID]);
                     AcceptingDeposits[projectID] = false;
                 }        
             }
        }

 
function getUSDBalance() public view returns (uint256)
{
   return USD.balanceOf(address(this));
}   

function getPayoutTokenBalance(uint64 ProjectID) public view returns (uint256)
{
   return IERC20(payoutToken[ProjectID]).balanceOf(address(this));
}  

function getETHBalance() public view returns (uint256)
{
   return address(this).balance;
} 

function getMyUSDInvested(uint64 ProjectID) public view returns (uint256)
{
   return _balanceUSD[msg.sender][ProjectID];
} 

function getMyTokensClaimed(uint64 ProjectID) public view returns (uint256)
{
   return _tokensReceived[msg.sender][ProjectID];
} 

function getUSDcontractAddress() public view returns (address)
{
   return USDContract;
} 

//Function to deposit USD tokens to contract. 
// USDvalue is the amount of dollars to invest
//Before calling this function, make sure that the contract has sufficient allowance by calling approve 
// on the USD token contract with this contract address and the desired investment amount * 10^18 decimals
//DO NOT SEND USD TOKENS DIRECTLY TO THIS CONTRACT. ONLY USE THE DepositUSD function or send 
//blockchain native currency (BNB/ETH/FTM etc.) directly
 function DepositUSD(uint64 ProjectID,uint USDvalue) public

       {  
          require(AcceptingDeposits[ProjectID], "Deposits closed");
          require(_balanceUSD[msg.sender][ProjectID]+USDvalue <= maxInvestment[ProjectID], "Value exceeds maximum deposit");
          require(USD.balanceOf(msg.sender)>= USDvalue, "Insufficient balance for deposit");
          require(USD.allowance(msg.sender,address(this))>= USDvalue, "Approval required to deposit");
          require(USDvalue >= minInvestment[ProjectID], "Value below minimum deposit");
          require(USD.transferFrom(msg.sender,address(this),USDvalue), "TransferFrom Failed");
          //success
          uint64 InvestorCount = N_Investors[ProjectID];
          if(_balanceUSD[msg.sender][ProjectID]==0) //new investor
                {
                _investorID[ProjectID][InvestorCount] = msg.sender;
                N_Investors[ProjectID]++;
                }
             _balanceUSD[msg.sender][ProjectID] += USDvalue;
                totalInvested[ProjectID] += USDvalue;
                
                emit DEPOSIT(msg.sender, USDvalue);

                if(distributeAtUSDDeposit)
                    SendDepositsToBankWallet(ProjectID);

              if(totalInvested[ProjectID] >= InvestmentGoal[ProjectID]) //Finalize deposits
                 {
                    TargetReached[ProjectID] = true;
                     emit TARGET_REACHED(totalInvested[ProjectID]);
                     AcceptingDeposits[ProjectID] = false;
                 }          
                 
       } 


//Calculates the share of each investor and pays out tokens accordingly
function ClaimTokens(uint64 ProjectID, address recipient) internal returns (bool)
{ 
   require(ClaimsEnabled[ProjectID], "Claiming Disabled");
   uint256 balance = _balanceUSD[recipient][ProjectID];

   if(balance>0)
   {
       _balanceUSD[recipient][ProjectID] = 0;
       uint256 share = TotalTokens[ProjectID] * (balance / totalInvested[ProjectID]);
       bool success = IERC20(payoutToken[ProjectID]).transfer(recipient,share);
      if(success)
      {
         TokensClaimed[ProjectID] += share; 
         _tokensReceived[recipient][ProjectID] += share;
         return true;
      }
      else 
      {
        _balanceUSD[recipient][ProjectID] = balance; // transfer failed
      }  

   }
  return false;
}

//Investor calls this function to claim his or her tokens
function ClaimMyTokens(uint64 ProjectID) public 
{
    require(ClaimTokens(ProjectID, msg.sender));
}

//Used to auto airdrop tokens to holders
//Avoid sending too many transfers in one go as a single failed transfer will cause all to revert.
//Increase gas limit by a couple of percent when calling this function to avoid unecessary failed transfers.
function DistributeTokens(uint64 ProjectID, uint64 startPos, uint64 endPos) public onlyMain() 
{
 if(endPos > N_Investors[ProjectID])
  endPos = N_Investors[ProjectID];
  for(uint64 i = startPos; i < endPos; i++)
  {
      ClaimTokens(ProjectID,_investorID[ProjectID][i]);
  }
}

//Sends USD token balance to bank wallet + converts ETH/BNB to USD token and sends.
//Called by deposit functions
function SendDepositsToBankWallet(uint64 ProjectID) public
{
 //send USD deposits
   uint USDbal = USD.balanceOf(address(this));
   if(USDbal > 0)
   USD.transfer(BankWallet[ProjectID],USDbal);

//Swap and send ETH
   uint ETHbal = address(this).balance;

   if(ETHbal > 0)
   {
     if(AutoSwapEnabled)
     {
        _swapBNBforChosenTokenandPayout(ETHbal,USDContract, BankWallet[ProjectID]); //only for BUSD deposits
     }  
     else
     { //send eth/bnb directly without swapping
       (bool success, ) = BankWallet[ProjectID].call{ value: ETHbal }(new bytes(0));
     } 
   }  

}

//Call this function after payout tokens have been deposited
function StartClaiming(uint64 ProjectID) public onlyMain() 
{
    AcceptingDeposits[ProjectID] = false;
    TotalTokens[ProjectID] = IERC20(payoutToken[ProjectID]).balanceOf(address(this));
    ClaimsEnabled[ProjectID] = true;
}

//function to recover tokens wrongfully sent to contract
function RecoverTokens(address ContractAddress, uint256 amount) public onlyMain()
{
    IERC20(ContractAddress).transfer(msg.sender,amount);
}

 /*Abi bytecodes for pancakerouter

{
    "ad5c4648": "WETH()",
    "e8e33700": "addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)",
    "f305d719": "addLiquidityETH(address,uint256,uint256,uint256,address,uint256)",
    "c45a0155": "factory()",
    "85f8c259": "getAmountIn(uint256,uint256,uint256)",
    "054d50d4": "getAmountOut(uint256,uint256,uint256)",
    "1f00ca74": "getAmountsIn(uint256,address[])",
    "d06ca61f": "getAmountsOut(uint256,address[])",
    "ad615dec": "quote(uint256,uint256,uint256)",
    "baa2abde": "removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)",
    "02751cec": "removeLiquidityETH(address,uint256,uint256,uint256,address,uint256)",
    "af2979eb": "removeLiquidityETHSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256)",
    "ded9382a": "removeLiquidityETHWithPermit(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)",
    "5b0d5984": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)",
    "2195995c": "removeLiquidityWithPermit(address,address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)",
    "fb3bdb41": "swapETHForExactTokens(uint256,address[],address,uint256)",
    "7ff36ab5": "swapExactETHForTokens(uint256,address[],address,uint256)",
    "b6f9de95": "swapExactETHForTokensSupportingFeeOnTransferTokens(uint256,address[],address,uint256)",
    "18cbafe5": "swapExactTokensForETH(uint256,uint256,address[],address,uint256)",
    "791ac947": "swapExactTokensForETHSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
    "38ed1739": "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
    "5c11d795": "swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
    "4a25d94a": "swapTokensForExactETH(uint256,uint256,address[],address,uint256)",
    "8803dbee": "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)"
}*/   
       
    
 //Swaps ETH/BNB to USD token and transfers to external wallet. Works for receiver != address(this) 
 function _swapBNBforChosenTokenandPayout(uint256 amountBNB,address PayoutTokenContract, address receiver) internal returns (bool){

        address[] memory path = new address[](2);
        path[0] = _pancakeRouter.WETH();
        path[1] = address(PayoutTokenContract);

     _pancakeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amountBNB}(
            0,
            path,
            address(receiver),
            block.timestamp + 20
        );
     
     return true;
    }    
    
    
    
}