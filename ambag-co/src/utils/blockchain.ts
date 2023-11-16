import Web3 from 'web3';
import { contract_abi } from '../pages/contract_abi';

export const web3 = new Web3((window as any).ethereum);
export const contract = new web3.eth.Contract(
  contract_abi,
  '0x16640884714d2135648872346fa35ac14f77344c'
);

const account = await (window as any).ethereum.request({
  method: 'eth_requestAccounts',
});

export const createAProject = async (
  address: string,
  title: string,
  desc: string,
  amount: number,
  deadline: number,
  bgImage: string
) => {
  await contract.methods
    .createProject(address, title, desc, amount, deadline, bgImage)
    .send({
      from: account[0],
      gas: '3000000',
    })
    .catch((err) => {
      console.log('error:', err);
    });
};

export const getAllProjects = async () => {
  const projects = await contract.methods.getAllProjects().call();
  console.log(projects);
  return projects;
};

export const fundAProject = async (
  projectToFund: number,
  amountToSend: string
) => {
  const result = await contract.methods.fundProject(projectToFund).send({
    from: account[0],
    gas: '3000000',
    value: web3.utils.toWei(amountToSend, 'ether'),
  });

  console.log(result);
};

export const getProjectDonors = async (projectId: number) => {
  const donors = await contract.methods.getDonors(projectId).call();

  console.log(donors);
};
