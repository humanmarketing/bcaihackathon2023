'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

export const Context = createContext({})

// export const Provider = props => <Context.Provider {...props} />
// convert to component; add auth; return provider 
export const Provider = ({ value = {}, children }) => {
	// const [$storeHash, set$storeHash] = useState('')

	// useEffect(() => {
    //     const authorized = authorize();

    //     if (!authorized) {
    //       throw new Error('Token is not valid. Try to re-open the app.');
    //     }
      
    //     const accessToken = db.getStoreToken(authorized.storeHash);
      
    //     if (!accessToken) {
    //       throw new Error('Access token not found. Try to re-install the app.');
    //     }
    //     else {
    //         set$storeHash(authorized.storeHash)
    //     }


	// }, [])


	return (
		<Context.Provider
			value={{
				...value,
			}}
			children={children}
		/>
	)
}




export const useGlobal = () => useContext(Context)