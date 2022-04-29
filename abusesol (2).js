const web3 =  require("@solana/web3.js");
const bs58 = require('bs58');


(async () => {
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    while (true){
        try{
            // Connect to cluster
            //console.log(web3.clusterApiUrl('devnet'))
            const connection = new web3.Connection(
                web3.clusterApiUrl('devnet'),
                'confirmed',
            );
            // Uncomment the below command to test your connection to your node
            //console.log(await connection.getEpochInfo())

            // Generate a new random public key
            const from = web3.Keypair.generate();
            const airdropSignature = await connection.requestAirdrop(
                from.publicKey,
                2000000000,
            );
            await connection.confirmTransaction(airdropSignature);

            // Generate a new random public key
            const to = new web3.PublicKey("G6DnGcB127NsH7V1AcHMynYZtHU2pJWL83cBNmkkwRuM")

            // Add transfer instruction to transaction
            const transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: 1999005000,
                }),
            );

            // Sign transaction, broadcast, and confirm
            const signature = await web3.sendAndConfirmTransaction(
                connection,
                transaction,
                [from],
            );
            //console.log('SIGNATURE', signature);
            await timeout(10000);
            //console.log('done');
        } catch (error) {
            let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
            console.log(errorMessage)
            //await timeout(5000);
        }
    }
})();