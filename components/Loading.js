import React from 'react'

function Loading () {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" alt=""
                    style={{ marginBottom: 10 }}
                    height={200} />
                <circle color="green" size={60} />

            </div>


        </center>
    )
}

export default Loading
