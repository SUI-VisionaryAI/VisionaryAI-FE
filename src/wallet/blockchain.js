import { Transaction } from '@mysten/sui/transactions';
import { useSignTransaction, useSuiClient, useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import toast from 'react-hot-toast';
import { MODEL_CONTRACT } from 'utils/const';
import { useMutation } from '@tanstack/react-query';

export function useTransactionExecution() {
    const client = useSuiClient();
    const { mutateAsync: signTransactionBlock } = useSignTransaction();

    const executeTransaction = async (
        txb
    ) => {
        try {
            
            const res = await client.signAndExecuteTransaction({
                transaction: txb,
                requestType: 'WaitForLocalExecution',
                options: {
                    showRawEffects: true,
                    showObjectChanges: true,
                },
            });
            console.log(client, 'resresres');

            toast.success("Successfully executed transaction!");
            return res;
        } catch (e) {
            console.log(e);
            
            toast.error(`Failed to execute transaction: ${e.message}`);
        }
    };

    return executeTransaction;

}


export function useExecutor({ execute } = {}) {
	const client = useSuiClient();
	const {
		mutate: signAndExecute,
		status,
		isIdle,
		isPending,
		isSuccess,
		isError,
		isPaused,
	} = useSignAndExecuteTransaction({ execute });

	const mutate = ({ tx, ...options }, then) => {
		signAndExecute(
			{
				transaction: tx,
			},
			{
				onSuccess: ({ digest }) => {
					client.waitForTransaction({ digest, ...options }).then(then);
				},

				onError: (error) => {
					console.error('Failed to execute transaction', tx, error);
				},
			},
		);
	};

	return {
		mutate,
		status,
		isIdle,
		isPending,
		isSuccess,
		isError,
		isPaused,
	};
}

// Create a new model
export function useCreateNewModelMutation() {
    const currentAccount = useCurrentAccount();
    //   const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
      const { mutate: signAndExecute, isPending } = useExecutor();
      const { mutate: mintModelMutation } = useMintModelMutation()
    return useMutation({
        mutationFn: async ({
            object,
        }) => {
            try {
                if (!currentAccount?.address)
                    throw new Error("You need to connect your wallet!");

                const tx = new Transaction();
                const amountInSmallestUnit = parseFloat(123) * 1_000_000;

                tx.moveCall({
                    target: `${MODEL_CONTRACT.packageId}::model::new_model`,
                    arguments: [
                        tx.pure.string(object.metadataUrl),
                        tx.pure.u64(amountInSmallestUnit),
                        tx.pure.address(currentAccount.address),
                    ],
                });
                console.log(tx,MODEL_CONTRACT.packageId, object,  'objectobject');
                return signAndExecute(
                    {
                        // SAFETY: Button is only enabled when player and opponent are
                        // available.
                        tx: tx,
                        options: { showObjectChanges: true },
                    },
                    (ress) => {
                    console.log(ress, 'ressress');
                    mintModelMutation({object: {modelMetadataId: ress?.objectChanges?.[1]?.objectId, paymentAmount: amountInSmallestUnit, }})
                    },
                );;
            } catch (e) {
                console.log(e);
                
                toast.error(`Failed to execute transaction: ${e.message}`);
            }
        },
    });
};

export function useMintModelMutation() {
    const currentAccount = useCurrentAccount();
      const { mutate: signAndExecute, isPending } = useExecutor();
    return useMutation({
        mutationFn: async ({
            object,
        }) => {
            try {
                if (!currentAccount?.address)
                    throw new Error("You need to connect your wallet!");

                const tx = new Transaction();
                const amountInSmallestUnit = parseFloat(123) * 1_000_000;
            const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInSmallestUnit)]);
            console.log(paymentCoin, 'paymentCoinpaymentCoin');
            tx.moveCall({
                target: `${MODEL_CONTRACT.packageId}::model::mint`,
                arguments: [
                    tx.object(object.modelMetadataId),
                    paymentCoin,
                    tx.pure.address(currentAccount.address),
                ],
            });
            console.log(tx, 'txtxxx')
            return signAndExecute(
                {
                    // SAFETY: Button is only enabled when player and opponent are
                    // available.
                    tx: tx,
                    options: { showObjectChanges: true },
                },
                (ress) => {
                console.log(ress, 'ressress');
                },
            );;
            } catch (e) {
                console.log(e);
                
                toast.error(`Failed to execute transaction: ${e.message}`);
            }
        },
    });
};


export function useCreateNewDatasetMutation() {
    const currentAccount = useCurrentAccount();
    //   const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
      const { mutate: signAndExecute, isPending } = useExecutor();
      const { mutate: mintModelMutation } = useMintModelMutation()
    return useMutation({
        mutationFn: async ({
            object,
        }) => {
            try {
                if (!currentAccount?.address)
                    throw new Error("You need to connect your wallet!");

                const tx = new Transaction();
                const amountInSmallestUnit = parseFloat(123) * 1_000_000_000;

                tx.moveCall({
                    target: `${MODEL_CONTRACT.packageId}::dataset::new_dataset`,
                    arguments: [
                        tx.pure.string(object.metadataUrl),
                        tx.pure.u64(amountInSmallestUnit),
                        tx.pure.address(currentAccount.address),
                    ],
                });
                console.log(tx,MODEL_CONTRACT.packageId, object,  'objectobject');
                return signAndExecute(
                    {
                        tx: tx,
                        options: { showObjectChanges: true },
                    },
                    (ress) => {
                    console.log(ress, 'ressress');
                    mintModelMutation({object: {modelMetadataId: ress?.objectChanges?.[1]?.objectId, paymentAmount: amountInSmallestUnit, }})
                    },
                );;
            } catch (e) {
                console.log(e);
                
                toast.error(`Failed to execute transaction: ${e.message}`);
            }
        },
    });
};

export function useMintDatasetMutation() {
    const currentAccount = useCurrentAccount();
      const { mutate: signAndExecute, isPending } = useExecutor();
    return useMutation({
        mutationFn: async ({
            object,
        }) => {
            try {
                if (!currentAccount?.address)
                    throw new Error("You need to connect your wallet!");

                const tx = new Transaction();
                const amountInSmallestUnit = parseFloat(123) * 1_000_000_000;
            const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInSmallestUnit)]);
            console.log(paymentCoin, 'paymentCoinpaymentCoin');
            tx.moveCall({
                target: `${MODEL_CONTRACT.packageId}::dataset::mint`,
                arguments: [
                    tx.object(object.modelMetadataId),
                    paymentCoin,
                    tx.pure.address(currentAccount.address),
                ],
            });
            console.log(tx, 'txtxxx')
            return signAndExecute(
                {
                    tx: tx,
                    options: { showObjectChanges: true },
                },
                (ress) => {
                console.log(ress, 'ressress');
                },
            );;
            } catch (e) {
                console.log(e);
                
                toast.error(`Failed to execute transaction: ${e.message}`);
            }
        },
    });
};
