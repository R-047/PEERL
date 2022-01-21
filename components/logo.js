import React from 'react'
import Image from 'next/image'

function logo(props) {
	console.log(props.class)
	return (
		<div className={props.class}>
			 <Image src="/peerllogo.svg" alt="PEERL Logo" width={100} height={50} />
		</div>
	)
}

export default logo
