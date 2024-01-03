import React, { Component } from 'react';
import search from "/public/assets/Images/search.png"

import PoolCard from '/components/SpellInventory/ManaPool/PoolCard';
 
import TOKEN_ABI from  "/utils/Config/TOKEN_ABI.json" 
import ROUTER_ABI from  "/utils/Config/ROUTER_ABI.json"
import LP_ABI from  "/utils/Config/LP_ABI.json"

import WIZARD from "/public/assets/Images/WIZARD.gif"


import WIZRDPWAR from "/public/assets/Images/WIZARDPWAR.gif"
import PWARDWIZARD from "/public/assets/Images/PWARDWIZARD.gif"

import WIZARDGUARD from "/public/assets/Images/WIZARDGUARD.gif"
import GUARDLP from "/public/assets/Images/GUARSDLP.gif"
import GUARDWIZARD from "/public/assets/Images/GUARDWIZARD.gif"
import ELOIN from "/public/assets/Images/ELOIN.gif"

import WIZARDLP from "/public/assets/Images/WIZARDLP.gif"
import PWARLP from "/public/assets/Images/PWARLP.gif"
import ELOINLP from "/public/assets/Images/ELOINLP.gif"

import ALTURALP from "/public/assets/Images/ALTURALP.gif"
import PIRATELP from "/public/assets/Images/PIRATELP.gif"
import PLAYLP from "/public/assets/Images/PLAYLP.gif"
import PLAY from "/public/assets/Images/PLAY.gif"
import XDITTOLP from "/public/assets/Images/XDITTOLP.gif"
import ALPHA from "/public/assets/Images/ALPHA.gif"
import ALPHALP from "/public/assets/Images/ALPHALP.gif"
import TOKEN_POOL_ABI from  "/utils/Config/TOKEN_POOL.json"
// import POOL_CONTRACT from  "/utils/Config/POOL_CONTRACT.json"
import DITTOLP from "/public/assets/Images/DITTOLP.gif"
 
import FOOTWIZARD from "/public/assets/Images/FOOTWIZARD.gif"
import FOOTLP from "/public/assets/Images/FOOTLP.gif"
import WIZARDFOOT from "/public/assets/Images/WIZARDFOOT.gif"

import BEAR from "/public/assets/Images/BEAR.gif"
import BEARLP from "/public/assets/Images/BEARLP.gif"
import JAW from "/public/assets/Images/JAW.gif"
import BBQLP from "/public/assets/Images/BBQLP.gif"
import KALATA from "/public/assets/Images/KALATA.gif"
import DEXF from "/public/assets/Images/DEXF.gif"

import { useEffect, useState } from 'react';
// import {useWallet} from '@binance-chain/bsc-use-wallet'

import Web3 from "web3"
import Config from '/utils/Config';
import KNIGHTNUGGET from "/public/assets/Images/KNIGHTNUGGET.gif"
import KNIGHTSPACE from "/public/assets/Images/KNIGHTSPACE.gif"
import SPACEKNIGHT from "/public/assets/Images/SPACEKNIGHT.gif"
import DKSKNIGHT from "/public/assets/Images/DKSKNIGHT.gif"
import KNIGHTDKS from "/public/assets/Images/KNIGHTDKS.gif"
import DKSDKS from "/public/assets/Images/DKSDKS.gif"
import DKSDKS2 from "/public/assets/Images/DKSDKS.fe49c789.gif"
import DKSDKS3 from "/public/assets/Images/DKSDKS3.gif"
import ACK from "/public/assets/Images/ACK.gif"
import SPA from '/public/assets/Images/SPA/spa.gif'
import { useAccount } from 'wagmi';
import styles from './style.module.css';

const POOL_CONTRACT =
[
  {address: "0x19494192FB1af995911F108EF9Aa035b741A4D9E", ownname : "CORE" , endTime : 1627851600000 , name: "SPA" , lp: 0, rewardToken: "Knight" , sape : 4 , rape: 4, stakeToken: " SPA" , website : "http://spartacrypto.io/" , image : SPA, simage : SPA, fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x4C61b5F6C3e6775b73B1A3954A0e01d924181433", ownname : "CORE" , endTime : 1627851600000 , name: "ACK" , lp: 0, rewardToken: "ACK" , sape : 0 , rape: 0, stakeToken: " ACK" , website : "https://wizard.financial" , image : ACK, simage : ACK , fee: 1 ,status : 1 , spair: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" , rpair: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"},

  {address: "0xEEB969FB4Ca0020ED16D5f30c9177e271FED1821", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: " WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARD , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x2006E2af9141202269520508936c8072990767Ab", ownname : "CORE" , endTime : 1627851600000 , name: "DKS" , lp: 0, rewardToken: "DKS" , sape : 0 , rape: 0, stakeToken: " DKS" , website : "https://wizard.financial" , image : DKSDKS3, simage : DKSDKS3 , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x37813FeE0Bf462C5A7fC93B3623dba05385963c2", ownname : "CORE" , endTime : 1627851600000 , name: "DKS" , lp: 0, rewardToken: "DKS" , sape : 0 , rape: 0, stakeToken: " DKS" , website : "https://wizard.financial" , image : DKSDKS2, simage : DKSDKS2 , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0xC94d183C96d682Db1fFf735deAF5481ff07b500D", ownname : "CORE" , endTime : 1627851600000 , name: "DKS" , lp: 0, rewardToken: "DKS" , sape : 0 , rape: 0, stakeToken: "DKS" , website : "https://wizard.financial" , image : DKSDKS, simage : DKSDKS , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x2BFB41dBcbB783307086003549c7c0954d7D6a71", ownname : "CORE" , endTime : 1627851600000 , name: "DKS" , lp: 0, rewardToken: "KNIGHT" , sape : 0 , rape: 4, stakeToken: "DKS" , website : "https://wizard.financial" , image : DKSKNIGHT, simage : DKSKNIGHT , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x0b11Ed39f877c700e26818d2F6c953edf7210085", ownname : "CORE" , endTime : 1627851600000 , name: "KNIGHT" , lp: 0, rewardToken: "DKS" , sape : 4 , rape: 0, stakeToken: "KNIGHT" , website : "https://wizard.financial" , image : KNIGHTDKS, simage : KNIGHTDKS , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0xb293811FF70c6CF4B63bCaCc3d0807F91E78fBd9", ownname : "CORE" , endTime : 1627851600000 , name: "KNIGHT" , lp: 0, rewardToken: "Gold Nugget" , sape : 4 , rape: 1, stakeToken: "KNIGHT" , website : "https://wizard.financial" , image : KNIGHTNUGGET, simage : KNIGHTNUGGET , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0xb3aeD270EBD04c09BE836A9BD66a18FFE2bE1dC2", ownname : "CORE" , endTime : 1627851600000 , name: "KNIGHT" , lp: 0, rewardToken: "Block Space" , sape : 4 , rape: 0, stakeToken: "KNIGHT" , website : "https://wizard.financial" , image : KNIGHTSPACE, simage : KNIGHTSPACE , fee: 1 ,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" },
    {address: "0x379A2F348e647225DE5F7716ce80299fF6bB5C71", ownname : "CORE" , endTime : 1627851600000 , name: "Block Space" , lp: 0, rewardToken: "KNIGHT" , sape : 0, rape: 4, stakeToken: "Block Space" , website : "https://wizard.financial" , image : SPACEKNIGHT, simage : SPACEKNIGHT , fee: 1 ,status : 1 , spair: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},

    {address: "0xdC3Cf68139b9eE88539E16292CaBe42fe720cF68", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARD , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},

    {address: "0xA9F3daC336968aea4ea9Da9591e0a5e97F573A1b", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARD , fee: 0 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
  {address: "0xd713189be9282C05c9F53E0e47814d2f2a39fA26", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 0, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM" , website : "#" , image : ALPHA , simage : ALPHA , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x3D783C8bADda5544a4553df67926742f4E7795D7", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "BARBECUE LP" , website : "#" , image : BBQLP , simage : BBQLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x6B63Ca3a72FfCCc0521Ef13Ab0BFE777Af90CaE8", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 1, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM LP" , website : "#" , image : ALPHA , simage : ALPHALP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x5BDb16d0cCbA034C3d3B94e9c77944406ab595BB", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "KALATA" , website : "#" , image : KALATA , simage : KALATA , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x872A9F56dC6C4A59D793FAD1434B22A005690A19", ownname : "CORE" , endTime : 1627851600000 , name: "DEXF" , lp: 0, rewardToken: "DEXF" , sape : 0 , rape: 0, stakeToken: "DEXF" , website : "#" , image : DEXF , simage : DEXF , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xF7d94D52Ccf760C6c02B34b736e7F3a42919F5BE", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "GUARD" , sape : 0 , rape: 1, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARDGUARD, simage : WIZARDGUARD , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x264907c1f8d71c71F98F9B54b29865c3c9a19B6c", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "GUARD " , sape : 0 , rape: 1, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xf0D53A04c555c5D2f899cAd85540ef02E136691E", ownname : "CORE" , endTime : 1627851600000 , name: "GUARD" , lp: 0, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "GUARD" , website : "https://wizard.financial" , image : GUARDWIZARD, simage : GUARDWIZARD , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x967C2Bfe1459088338EeEBe75ac42B6D040622B0", ownname : "CORE" , endTime : 1627851600000 , name: "GUARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 3 , rape: 0, stakeToken: "GUARD LP" , website : "https://wizard.financial" , image : GUARDLP, simage : GUARDLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
   
    {address: "0x4dbbe653650a6086dDaF16Af5480A07D807d8701", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "FOOT" , sape : 0 , rape: 1, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARDFOOT , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x3C71E0ccc16C8d2De234b96e01b119A6413835a8", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "FOOT" , sape : 0 , rape: 1, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARDLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xa1bd3042ca4896e1cd3d384eec6e7e826977aa23", ownname : "CORE" , endTime : 1627851600000 , name: "FOOT" , lp: 0, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "FOOT" , website : "https://bigfoottoken.finance/" , image : WIZARD, simage : FOOTWIZARD , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xF5E047a89f3f5851EDC5CE209E99dab8aA7CbdC9", ownname : "CORE" , endTime : 1627851600000 , name: "FOOT LP" , lp: 1, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "FOOT LP" , website : "https://bigfoottoken.finance/" , image : WIZARD, simage : FOOTLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
  
    // {address: "0x8e0A533f7Df4AE3C0C79a64D9194af49dcDEF1bA", ownname : "CORE" , endTime : 1627851600000 , name: "DITTO LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "DITTO LP" , website : "https://wizard.financial" , image : WIZARD, simage : DITTOLP , fee: 0 ,status : 1 },
  
    {address: "0x0f1DddEb48Fc57262478A8bc690B1B58Fb730944", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "DITTO" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
  
  
    {address: "0xfBBf706aF305f0b13f412cEC17b0638834b1bcf1", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "JAW" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : JAW , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xB17F5129d9314019cB6d2ff5C42006C30fE026E4", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "JAW" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
  
  
    {address: "0xF82bA8577Fc27446f2f6986ADB2099Aea5710ECC", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "BEAR" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : BEAR, simage : BEAR , fee: 1 ,status : 1 , spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x82364026b4Ce059CF03097042A439bdC9271ad48", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "BEAR" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : BEARLP, simage : BEARLP , fee: 1 ,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0xf833Aa19a3aA80384E76a30D1af20Dd934150277", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP , simage : WIZARDLP , fee: 1 ,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0xD4B6972cf3c2a48223f36546Af864Cd186Ea330e", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP , simage : WIZARDLP , fee: 0 ,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0xDC83A356f45860925329ad21fC069e2d3A606Cb0", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "PWAR" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://polkawar.com/" , image : WIZRDPWAR , simage : WIZRDPWAR , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x35a193DBd5dF064B71d4C55D1a95a59f35cb3975", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PWAR" , website : "https://wizard.financial" , image : WIZRDPWAR , simage : PWARDWIZARD , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0x9e30dD18E9363488B9fcE43e3ce3d9FcF99f6471", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "PWAR" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://polkawar.com/" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0xe15e9bF9bC7dFc505BE98Bb601EF2C3f9bb89Dc1", ownname : "CORE" , endTime : 1627851600000 , name: "PWAR LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PWAR LP" , website : "https://wizard.financial" , image : PWARLP , simage : PWARLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  {address: "0xCcC73Dc32752cDd13C200d4eCE7Cf3bB550fBf67", ownname : "CORE" , endTime : 1627851600000 , name: "ELOIN" , lp: 0, rewardToken: "ELOIN" , sape : 0 , rape: 0, stakeToken: "ELOIN" , website : "https://www.eloin.in" , image : ELOIN , simage : ELOIN , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0xa9CE7765aEA906bAe5d79E5214840d634b5e1f09", ownname : "CORE" , endTime : 1627851600000 , name: "ELOIN" , lp: 1, rewardToken: "ELOIN" , sape : 0 , rape: 0, stakeToken: "ELOIN LP" , website : "https://www.eloin.in" , image : ELOINLP , simage : ELOINLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x0B39ccA687dCe2c17e5c7Bc3220E3237AFfaEb9D", ownname : "CORE" , endTime : 1627851600000 , name: "PLAY" , lp: 1, rewardToken: "PLAY" , sape : 0 , rape: 0, stakeToken: "PLAY LP" , website : "https://polyplay.net/" , image : PLAYLP , simage : PLAYLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x0ED49399670e8144BA764FaD423c8558Cee1827A", ownname : "CORE" , endTime : 1627851600000 , name: "ALTURA" , lp: 1, rewardToken: "ALTURA" , sape : 0 , rape: 0, stakeToken: "ALTURA LP" , website : "https://www.alturanft.com/" , image : ALTURALP   , simage : ALTURALP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x95e88a1FC73c8a4fb05076f53F90407da4F8F36d", ownname : "CORE" , endTime : 1627851600000 , name: "PLAY" , lp: 0, rewardToken: "PLAY" , sape : 0 , rape: 0, stakeToken: "PLAY" , website : "https://polyplay.net/" , image : PLAY , simage : PLAY , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0xD50261195eb0CA158Cde16F30fAE29CDC77743fc", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PIRATE LP" , website : "https://wizard.financial/" , image : PIRATELP , simage : PIRATELP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0xEAf1331160Be23E60Eaf3eB5E633eCC1D09700CC", ownname : "CORE" , endTime : 1627851600000 , name: "PIRATE" , lp: 1, rewardToken: "PIRATE" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://www.eloin.in" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    
    {address: "0x6dcec55bD51dfB8a78ef8139500EB446a57932A9", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "WIZARD" , sape : 2 , rape: 0, stakeToken: "XDITTO LP" , website : "https://wizard.financial/" , image : XDITTOLP , simage : XDITTOLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x2734cf994Dd4Fe8869a27D760FFc7EEF58e9A30D", ownname : "CORE" , endTime : 1627851600000 , name: "XDITTO" , lp: 1, rewardToken: "XDITTO" , sape : 0 , rape: 2, stakeToken: "WIZARD LP" , website : "https://ditto.money/" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
    {address: "0x0A0414901127822ff6F17EE8239f522F562d8c63", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 0, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM" , website : "#" , image : ALPHA , simage : ALPHA , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {address: "0x3514C423c64b13967ABbF99cC161ba8edc556CbD", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 1, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM LP" , website : "#" , image : ALPHA , simage : ALPHALP , fee: 1,status : 1, spair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" , rpair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  
  ];


const Pools = () => {
 
    // const data = JSON.parse(sessionStorage.getItem('pool'));
    const [isOpen, setOpen]= useState(false);
    const [isConnected, setConnected]= useState(false);
    const [modal, setModal] = useState(false);
    const [depositmodal, setDepositmodal] = useState(false);
  
    const [oneDayRoi, setOneDayRoi] = useState(0);
    const [sevenDayRoi, setSevenDayRoi] = useState(0);
    const [thirtyDayRoi, setThirtyDayRoi] = useState(0);
    const [yearRoi, setyearRoi] = useState(0);
    
    const [oneDay, setOneDay] = useState(0);
    const [sevenDay, setSevenDay] = useState(0);
    const [thirtyDay, setThirtyDay] = useState(0);
    const [year, setyear] = useState(0);
  
    const [link, setLink] = useState('0');
  //   const [web3Provider, setweb3Provider] = useState(null);
    let web3Provider;
    if (typeof window !== "undefined") {
      web3Provider = window.ethereum;
   }
     
  
    
  
    const [roimodal, setRoimodal] = useState(false);
    const [withdrawmodal, setWithdrawmodal] = useState(false);
    const [nowithdrawmodal, setnoWithdrawmodal] = useState(false);
    const [noclaimRewardmodal, setnoclaimRewardmodal] = useState(false);
    
    const [details, setShowDetails] = useState([]);
    
    const [symbol, setSymbol] = useState('');
    const [rsymbol, setrSymbol] = useState('');
    
    const [balance, setBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [currentContract, setCurrentContract] = useState('');
    const [wcurrentContract, setWCurrentContract] = useState('');
    const [wsamount, setwsamount] = useState('');
    const [damount, setdAmount] = useState('');
    
    const [wsymbol, setWSymbol] = useState('');
    const [wbalance, setWBalance] = useState(0);
  //   var poolsArray = [] ;
    const [poolsArray, setPoolsArray]= useState([]);
    const [stakedAddress, setstakedAddress]= useState([]);
	
    const [tvl, setTVL]= useState(0);
    
  //   const [pools, setPools]= useState([]);
    const [tpop, setTPop]= useState(false);
  const [show, setShow] = useState(false);
  const [depositError, setDepositError] = useState(false);
  const [withdrawError, setWithdrawError] = useState(false);
    
  const [selectedPage, setSelectedPage] = useState("Project_Detail");
   
  
  const wallet = useAccount();
  console.log(wallet,"wallet address manapool")
  
   const [filter , setfilter] = useState([])
   const [keysearch , setKeySearch] = useState(null)
   
  


  useEffect(() => {

    if(window.ethereum){

      console.log("before web3");
        web3Provider  = window.ethereum;
      }
      else{
        
        web3Provider = new Web3.providers.HttpProvider("https://rpc.ankr.com/bsc")
      }

    // web3Provider = new Web3.providers.HttpProvider("https://rpc.ankr.com/bsc")

	  getStaked() ;
	  initContracts() ;

	},[wallet.address])


    const handleSearch = (e) => {
		setKeySearch(e.target.value.toLowerCase())
	}


	

const initContracts  = async () =>  {
  
    let _totalVolume =  0;
 
        for(let i = 0 ; i < POOL_CONTRACT.length; i++ ){
        var v = POOL_CONTRACT[i] ;  
       
        if(v.lp == 0){
          let _volume = await getVolume(i) ;
          _totalVolume += parseInt(_volume) ;
      
        }
 
        if(i == (POOL_CONTRACT.length -1)){
            setTVL(_totalVolume);
            console.log("Total VolumeA Locked", _totalVolume);
        }

    }  
}

  
const getVolume = async (_index) => {
    var v = POOL_CONTRACT[_index];  
    let _web3 = new Web3(web3Provider);
    const BNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; // BNB or another token
    const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' ; //BUSD
    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    console.log("_tokenPoolContract", _tokenPoolContract);
  
    let totalStaked = await _tokenPoolContract.methods.totalStaked().call() ;
    let stakeTokenAddress = await _tokenPoolContract.methods.stakeToken().call() ;
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeTokenAddress);
    let stotalDecimals = await _tokenContract.methods.decimals().call() ;

    let RROUTER_ADDRESS = null ; 
        let SROUTER_ADDRESS = null ; 
        if(v.rape == 0){
            RROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
        }
        else if(v.rape == 1) {
            RROUTER_ADDRESS = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';

        }
        else if(v.rape == 2) {
          RROUTER_ADDRESS = '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F';

      }
      else if(v.rape == 3) {
        RROUTER_ADDRESS = '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd';
         
    }
        else if(v.rape == 4) {
      RROUTER_ADDRESS = '0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f';
       
  }
        if(v.sape == 0){
            SROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
        }
        else if(v.sape == 1){
            SROUTER_ADDRESS = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';

        }
        else if(v.sape == 2) {
          SROUTER_ADDRESS = '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F';
      }
      else if(v.sape == 3) {
        SROUTER_ADDRESS = '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd';
         
    }
    else if(v.sape == 4) {
      SROUTER_ADDRESS = '0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f';
       
  }

        let _amountUSD = 1 * (10 ** 18 ); 

        let _routerContractS = new _web3.eth.Contract(ROUTER_ABI, SROUTER_ADDRESS);

        console.log("_routerContract", SROUTER_ADDRESS);
        let _resultUSDS = await _routerContractS.methods.getAmountsOut(_amountUSD+'', [BNB, BUSD]).call();
        
        let BNBUsdS = _resultUSDS[1] / (10 ** 18);
 
        let _routerContractR = new _web3.eth.Contract(ROUTER_ABI, RROUTER_ADDRESS);
 
        let _resultUSDR = await _routerContractR.methods.getAmountsOut(_amountUSD+'', [BNB, BUSD]).call();
        
        let BNBUsdR = _resultUSDR[1] / (10 ** 18);

    let apr  = 0 ;
    let sttokenpool = 0 ;
    if(totalStaked > 0 ){
        let _stokenPrice = 0 ;
        let _tokenPrice = 0 ;

        if(v.lp == 1){
            console.log("It's LP");

            let _tokenLpContract = new _web3.eth.Contract(LP_ABI,stakeTokenAddress);
            let _tokenA = await  _tokenLpContract.methods.token0().call();
            let _tokenB = await  _tokenLpContract.methods.token1().call();
            let _tokenSupply = await  _tokenLpContract.methods.getReserves().call();

            let _tokenAContract = new _web3.eth.Contract(TOKEN_ABI,_tokenA);
            let _tokenBContract = new _web3.eth.Contract(TOKEN_ABI,_tokenB);
            let _tokenAdecimals = await _tokenAContract.methods.decimals().call() ;
            let _tokenBdecimals = await _tokenBContract.methods.decimals().call() ;

            // let _tokenBSupply = await  _tokenLpContract.methods.token1().call() ;
            // let _tokenADetails = await fetch('https://api.dex.guru/v1/tokens/'+_tokenA+'-bsc').then((data) => data.json());
            // let _tokenBDetails = await fetch('https://api.dex.guru/v1/tokens/'+_tokenB+'-bsc').then((data) => data.json());
            let _amountA = 1 * (10 ** _tokenAdecimals); 
            let _amountB = 1 * (10 ** _tokenBdecimals ); 
            // console.log("Getting LP Price");
            
            let _tokenBpriceUSD = BNBUsdS ;
            if(_tokenB != BNB){
                let _resultB = await _routerContractS.methods.getAmountsOut(_amountB+'', [_tokenB, BNB]).call();
                _tokenBpriceUSD = _resultB[1] / (10 ** 18); // price of 1 CAKE in BUSD
                _tokenBpriceUSD = _tokenBpriceUSD * BNBUsdS ;

            }

            let _tokenApriceUSD = BNBUsdS ;
            if(_tokenA != BNB){
            let _resultA = await _routerContractS.methods.getAmountsOut(_amountA+'', [_tokenA, BNB]).call();

            _tokenApriceUSD = _resultA[1] / (10 ** 18); // price of 1 CAKE in BUSD
            _tokenApriceUSD = _tokenApriceUSD * BNBUsdS ;

            }
            // console.log("Token A  Price: ", _tokenApriceUSD);
            // console.log("Token B  Price: ", _tokenBpriceUSD);
            
            let _tokenAsupply = _tokenSupply._reserve0/1e1**_tokenAdecimals ;
            let _tokenBsupply = _tokenSupply._reserve1/1e1**_tokenBdecimals ;

            let _totalValue = parseFloat(_tokenApriceUSD*_tokenAsupply) + parseFloat(_tokenBpriceUSD*_tokenBsupply) ;
            // console.log("Total "+v.name+" Value: ", _totalValue);

            let _totalSupply = await  _tokenLpContract.methods.totalSupply().call() ; 
            let _lpDecimals = await  _tokenLpContract.methods.decimals().call() ; 
            console.log("Total "+v.name+" Supply: ", _totalSupply);
            _totalSupply = _totalSupply/1e1**_lpDecimals ;
            _stokenPrice = parseFloat(_totalValue/_totalSupply)
            console.log("Total "+v.name+" Price: ", _stokenPrice);
            
    
    
            }
            else{
                console.log("Getting S Price");
                // _stokenPrice = 1 ;
                let _amountS = 1 * (10 ** stotalDecimals ); 
                console.log("_amountS",_amountS, stakeTokenAddress, v.spair);
                let _resultS = await _routerContractS.methods.getAmountsOut(_amountS+'', [stakeTokenAddress,v.spair]).call();
                console.log("_resultS", totalStaked);
                _stokenPrice = _resultS[1] / (10 ** 18); // price of 1 CAKE in BUSD
                console.log("StakeP "+v.stakeToken+": "+_stokenPrice)
                if(v.spair != BUSD){
                  _stokenPrice = _stokenPrice * BNBUsdS ;

                }
                // const _stokenDetails = await fetch('https://api.dex.guru/v1/tokens/'+temp['stakeTokenAddress']+'-bsc').then((data) => data.json());
                console.log("StakeP "+v.stakeToken+": "+_stokenPrice)
                // _stokenPrice  = _stokenDetails.priceUSD ;
                // _stokenPrice  = _stokenDetails.priceUSD ;

            }
            
        sttokenpool = parseFloat(_stokenPrice*totalStaked/1e1**stotalDecimals).toFixed();
        return sttokenpool ;
    }
    else{
        return sttokenpool ;
    }
} 

 


  const handleCheckbox = (el) => {
	let temp = [] ;
	let detailarr = filter.slice()  ;

    let index = detailarr.indexOf(el) ;

    if(index >= 0) {
        detailarr.splice(index, 1) ;
        setfilter(detailarr);
    }
    else{
        detailarr.push(el) ;
        setfilter(detailarr);

    }
 
		 

	}
 
	const getStaked = async () => {
	  
		let _web3 = new Web3(web3Provider);
		let detailarr = []  ;

		if(wallet.address){
			POOL_CONTRACT.map(async (v,i) => {
				let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
				let userInfo = await _tokenPoolContract.methods.userInfo(wallet.address).call() ;  
				if(userInfo.amount > 0){					  					 
						detailarr.push(v.address) ;
						setstakedAddress(detailarr);
						}
				 
			})
		}
		
	
        }
        const [showActive,setShowActive] = useState(true);

  		return(
			<div className="main-bg justify-center flex">
				<div className={`${styles.font_text} container`}>
          <div className="pools-head">
            <h3>Pools</h3>
          </div>
        <section id="pool-section">
					<div className="mainwrp">
						<div className="side-bar"></div>
						<div className="main-bar">
							<div className="banner-pool">
								<h3>Mana Pools</h3>
								<p>Stake and earn new tokens.
									<br></br>
									You can unstake at any time but there is 2% unstake fee for all pools.
									<br></br>
									Rewards are calculated per block.
								</p>
							</div>
							<div className="second-area">
            
							<div className="banner-top-sec">
              
								<div className="serch-box">
								
									<div className="input-s-box">
										<input  onChange={handleSearch}  type="text" className='relative'/>
										<span><img src="/assets/Images/search.png" alt='load search icon' className='absolute top-7 left-44' /></span>
									</div>
								</div>
								<div className="inactive-box">
									<ul class="tabs3">
									<li class="tab-button"><a href="#" className={`${showActive?"active":"inactive"}`} data-tab="active" onClick={()=>{setShowActive(true)}}>Active</a></li>
									<li class="tab-button"><a href="#" className={`${showActive?"inactive":"active"}`} data-tab="inactive" onClick={()=>{setShowActive(false)}}>Inactive</a></li>	
									</ul>
                  {
                    tvl >= 1e6 &&
                    <span className="sqrBx">Total Value Locked ${parseFloat(tvl/1e6).toFixed(2)}m</span>               

                }
                {
                    tvl < 1e6 &&
                    <span className="sqrBx">Total Value Locked ${parseFloat(tvl/1e3).toFixed()}k</span>               

                }
								</div>
								<div className="main-wrp-staked">
									
                  {/* {
                    wallet.address !=null?<div className="staked">
										<input id="checkbox-4" type="checkbox" onChange={() => handleCheckbox('STAKED')} />
										<label class="checkbox text-white" for="checkbox-4">Staked</label>
									</div>:""
                  } */}

                  <div className="staked">
										<input id="checkbox-4" type="checkbox" onChange={() => handleCheckbox('STAKED')} />
										<label class="checkbox text-white" for="checkbox-4">Staked</label>
									</div>
										
									<div className="ganaba">
										<input id="checkbox-5" onChange={() => handleCheckbox('WIZARD')} type="checkbox"  />
										<label class="checkbox" for="checkbox-5">WIZARD</label>
									</div>
                  
								</div>
							</div>
							
							<div class="tab-pane">
								<div className={`${showActive?"active":"inactive"} tab-panel`} id="active">
								<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							
								{POOL_CONTRACT.length > 0 && POOL_CONTRACT.map((value, index) => {
									if(value.lp == 0 ){
										if(filter.includes('WIZARD')  ){
											if( (keysearch == null || value.rewardToken.toLowerCase().includes(keysearch)) ){
											if(value.rewardToken == "WIZARD" || value.rewardToken == "WIZARD LP"  ){
											if(filter.includes('STAKED')){
												if(stakedAddress.includes(value.address)){
													return    (											 
														<PoolCard address={value.address} index={index}   status={1} />
													) 
												}
											}
											else{
												
													return  <PoolCard address={value.address} index={index} status={1} />
														}
													}
												}
										}
										else if(filter.includes('STAKED')  ){
											if( (keysearch == null || value.rewardToken.toLowerCase().includes(keysearch)) ){

											if(stakedAddress.includes(value.address)){
												return    (											 
													<PoolCard address={value.address} index={index}  status={1} />
												) 
											}		
										}										 
										}
										else if(keysearch == null || keysearch == "" || value.stakeToken.toLowerCase().includes(keysearch)){
											return  <PoolCard address={value.address} index={index}  status={1} />

										}
									}
                                      })}
  </div>
								</div>
	<div className={`${showActive?"inactive":"active"} tab-panel`} id="inactive">
                <div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
							
              {POOL_CONTRACT.length > 0 && POOL_CONTRACT.map((value, index) => {
                if(value.lp == 0){
                  if(filter.includes('WIZARD')  ){
                    if( (keysearch == null || value.rewardToken.toLowerCase().includes(keysearch)) ){
                    if(value.rewardToken == "WIZARD" || value.rewardToken == "WIZARD LP"  ){
                    if(filter.includes('STAKED')){
                      if(stakedAddress.includes(value.address)){
                        return    (											 
                          <PoolCard address={value.address} index={index} status={0}  />
                        ) 
                      }
                    }
                    else{
                      
                        return     <PoolCard address={value.address} index={index}  status={0} />
                          }
                        }
                      }
                  }
                  else if(filter.includes('STAKED')  ){
                    if( (keysearch == null || value.rewardToken.toLowerCase().includes(keysearch)) ){

                    if(stakedAddress.includes(value.address)){
                      return    (											 
                        <PoolCard address={value.address} index={index}  status={0}/>
                      ) 
                    }		
                  }										 
                  }
                  else if(keysearch == null || keysearch == "" || value.stakeToken.toLowerCase().includes(keysearch)){
                    return  <PoolCard address={value.address} index={index}  status={0} />
                  }
                }
                })}
</div>
								</div>
								   
    </div>
  </div>
</div>	 
					</div>
				</section>
        </div>
     	
			</div>
		);
 

}
export default Pools;