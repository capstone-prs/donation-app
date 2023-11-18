import Web3 from 'web3';
import { contract_abi } from '../pages/contract_abi';

export const web3 = new Web3((window as any).ethereum);
export const contract = new web3.eth.Contract(
  contract_abi,
  '0xa35fcb5fde87d68ef81f9beec0cc20af69f4aedb'
);

const account = await (window as any).ethereum.request({
  method: 'eth_requestAccounts',
});

export const createAProject = async (
  title: string,
  desc: string,
  amount: number,
  deadline: number,
  bgImage: string
) => {
  await contract.methods
    .createProject(account[0], title, desc, amount, deadline, bgImage)
    .send({
      from: account[0],
      gas: '7000000',
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
  amountToSend: number
) => {
  const result = await contract.methods.fundProject(projectToFund).send({
    from: account[0],
    gas: '3000000',
    value: web3.utils.toWei(amountToSend.toString(), 'ether'),
  });

  console.log(result);
};

export const getProjectDonors = async (projectId: number) => {
  const donors = await contract.methods.getDonors(projectId).call();
  console.log(donors);
  return donors;
};

export const getProject = async (id: number) => {
  const projects = await contract.methods.getAllProjects().call();

  for (let i = 0; i < projects.length; i++) {
    if (i === id) {
      console.log(projects[id]);
      return projects[id];
    }
  }
};
