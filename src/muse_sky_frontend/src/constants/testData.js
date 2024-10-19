import { 
  image100, image97, 
  image98, image99, 
  images101, image102, 
  rectangle9393, rectangle9384, 
  rectangle9383, 
  About,
  Team} from "../assets/images";

export const collections = [
  {
    creatorName: "James Watson",
    collectionName: "GenJa Art Collection",
    mainImage: image97,
    sideImage1: image98,
    sideImage2: image99,
  },
  {
    creatorName: "James Watson",
    collectionName: "Ain’t Punk Art Collection",
    mainImage: images101,
    sideImage1: image100,
    sideImage2: image102,
  },
  {
    creatorName: "James Watson",
    collectionName: "Spark Art Collection",
    mainImage: rectangle9393,
    sideImage1: rectangle9384,
    sideImage2: rectangle9383,
  },
  {
    creatorName: "James Watson",
    collectionName: "Ain’t Punk Art Collection",
    mainImage: images101,
    sideImage1: image100,
    sideImage2: image102,
  },
  {
    creatorName: "James Watson",
    collectionName: "GenJa Art Collection",
    mainImage: image97,
    sideImage1: image98,
    sideImage2: image99,
  },
  {
    creatorName: "James Watson",
    collectionName: "Spark Art Collection",
    mainImage: rectangle9393,
    sideImage1: rectangle9384,
    sideImage2: rectangle9383,
  },
  {
    creatorName: "James Watson",
    collectionName: "Spark Art Collection",
    mainImage: rectangle9393,
    sideImage1: rectangle9384,
    sideImage2: rectangle9383,
  },
{
    creatorName: "James Watson",
    collectionName: "GenJa Art Collection",
    mainImage: image97,
    sideImage1: image98,
    sideImage2: image99,
  },
  {
    creatorName: "James Watson",
    collectionName: "Ain’t Punk Art Collection",
    mainImage: images101,
    sideImage1: image100,
    sideImage2: image102,
  },

];

export const aboutCards = [
  {
    imageSrc: About,
    title: "Who we are",
    description: "Musesky is an NFTs marketplace built on the internet computer where you can discover, sell and bid NFTs and get rich",
  },
  {
    imageSrc: Team,
    title: "Team",
    description: "Musesky is an NFTs marketplace built on the internet computer where you can discover, sell and bid NFTs and get rich",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "NFT Insights: Understanding ICP Reverse Fees vs. Ethereum PoS",
    content: `<h2>Introduction</h2>
<p>Gas fees are a crucial aspect of blockchain transactions, often determining the efficiency and cost-effectiveness of different platforms. In this post, we'll explore the differences between Internet Computer Protocol (ICP) reverse fees and Ethereum's Proof of Stake (PoS) gas fees.</p>
<h2>ICP Reverse Fees</h2>
<p>ICP introduces an innovative concept called "reverse gas fees." Here's how it works:</p>
<ul>
  <li>Canister smart contracts pay for their own computation and storage</li>
  <li>Users don't need to hold ICP tokens to interact with dapps</li>
  <li>Developers can subsidize user interactions, improving UX</li>
</ul>
<h2>Ethereum PoS Gas Fees</h2>
<p>Ethereum's transition to PoS has impacted its fee structure:</p>
<ol>
  <li>Gas fees are still required for transactions</li>
  <li>PoS has generally led to lower and more stable fees</li>
  <li>EIP-1559 introduced a base fee burn mechanism</li>
</ol>
<h2>Comparison</h2>
<p>When comparing ICP and Ethereum:</p>
<ul>
  <li>ICP offers potentially lower costs for users</li>
  <li>Ethereum has a more established ecosystem</li>
  <li>Both aim to improve scalability and reduce fees</li>
</ul>
<p>In conclusion, both ICP and Ethereum are making strides in addressing the challenge of transaction fees, each with its unique approach.</p>`,
    imageUrl: image97,
    date: "2023-11-15T12:00:00Z"
  },
  {
    id: 2,
    title: "Cost Comparison: ICP vs. Ethereum for NFT Operations",
    content: `<h2>Introduction to NFT Costs</h2>
<p>When it comes to minting and trading NFTs, the choice of blockchain can significantly impact costs. Let's compare the expenses associated with NFT operations on Internet Computer Protocol (ICP) and Ethereum.</p>
<h2>Minting Costs</h2>
<h3>ICP Minting</h3>
<ul>
  <li>Typically lower due to reverse gas model</li>
  <li>Costs often absorbed by the dapp or canister</li>
</ul>
<h3>Ethereum Minting</h3>
<ul>
  <li>Can be expensive during network congestion</li>
  <li>Improvements with Layer 2 solutions</li>
</ul>
<h2>Trading Costs</h2>
<p>Trading NFTs also incurs different costs on each platform:</p>
<table>
  <tr>
    <th>Platform</th>
    <th>Average Cost</th>
    <th>Speed</th>
  </tr>
  <tr>
    <td>ICP</td>
    <td>Lower</td>
    <td>Fast</td>
  </tr>
  <tr>
    <td>Ethereum</td>
    <td>Higher</td>
    <td>Variable</td>
  </tr>
</table>
<h2>Conclusion</h2>
<p>While Ethereum has the advantage of a larger ecosystem, ICP offers a cost-effective alternative for NFT operations, especially beneficial for frequent traders and creators.</p>`,
    imageUrl: image98,
    date: "2023-11-20T14:30:00Z"
  },
  {
    id: 3,
    title: "Musesky: Where Weather Fuels Creativity",
    content: "Explore how Musesky's unique weather-inspired NFT creation process is revolutionizing digital art and fostering creativity.",
    imageUrl: image99,
    date: "November 25, 2023"
  },
  {
    id: 4,
    title: "The Rise of Weather-Based NFTs",
    content: "Discover the emerging trend of weather-influenced NFTs and how they're capturing real-world phenomena in digital art.",
    imageUrl: image100,
    date: "November 30, 2023"
  },
  {
    id: 5,
    title: "Blockchain and Meteorology: An Unlikely Pair",
    content: "How blockchain technology and meteorology are coming together to create unique, verifiable digital assets based on weather patterns.",
    imageUrl: images101,
    date: "December 5, 2023"
  },
  {
    id: 6,
    title: "The Environmental Impact of Weather NFTs",
    content: "Analyzing the ecological footprint of creating and trading weather-based NFTs compared to traditional NFT platforms.",
    imageUrl: image102,
    date: "December 10, 2023"
  },
  {
    id: 7,
    title: "Musesky's Innovative Approach to NFT Creation",
    content: "Delve into the unique process behind Musesky's weather-inspired NFT generation and how it's changing the digital art landscape.",
    imageUrl: image97,
    date: "December 15, 2023"
  },
  {
    id: 8,
    title: "The Future of Weather Data in Blockchain",
    content: "Exploring potential applications of weather data in blockchain beyond NFTs, including smart contracts and decentralized insurance.",
    imageUrl: image98,
    date: "December 20, 2023"
  },
  {
    id: 9,
    title: "Artist Spotlight: Top Creators on Musesky",
    content: "Meet the talented artists behind some of Musesky's most popular weather-inspired NFT collections.",
    imageUrl: image99,
    date: "December 25, 2023"
  },
  {
    id: 10,
    title: "Collecting Weather NFTs: A New Trend for Digital Art Enthusiasts",
    content: "Why collectors are increasingly drawn to weather-based NFTs and how to start your own collection on Musesky.",
    imageUrl: image100,
    date: "December 30, 2023"
  },
  {
    id: 11,
    title: "The Science Behind Weather-Inspired NFTs",
    content: "A deep dive into the meteorological data and algorithms that power Musesky's unique NFT creation process.",
    imageUrl: images101,
    date: "January 5, 2024"
  },
  {
    id: 12,
    title: "Musesky's Impact on the NFT Market: A Year in Review",
    content: "Analyzing how Musesky has influenced the broader NFT ecosystem and what it means for the future of digital art.",
    imageUrl: image102,
    date: "January 10, 2024"
  },
  {
    id: 13,
    title: "Weather NFTs as Digital Collectibles: A New Era",
    content: "Examining the potential of weather-based NFTs as unique digital collectibles and their place in the broader collectibles market.",
    imageUrl: image97,
    date: "January 15, 2024"
  },
  {
    id: 14,
    title: "The Role of AI in Creating Weather-Inspired NFTs",
    content: "How artificial intelligence is enhancing the creation process of weather-based NFTs on platforms like Musesky.",
    imageUrl: image98,
    date: "January 20, 2024"
  },
  {
    id: 15,
    title: "Musesky's Community: Building a Weather NFT Ecosystem",
    content: "Exploring the vibrant community of artists, collectors, and enthusiasts that has formed around Musesky's unique NFT platform.",
    imageUrl: image99,
    date: "January 25, 2024"
  }
];
