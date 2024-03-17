import { AppProps } from 'next/app'
import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import {  Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['cyrillic'], weight: '400' })

export default function App({ Component, pageProps }:AppProps) {
 

  
  

 
  
  
  
  return (
   
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        <title>Ленинградское отделение ФКС Россиии</title>
      </Head>
        <main className={roboto.className}>
          
                <Component {...pageProps} />
          
        </main>
    </React.Fragment>
  )

}    