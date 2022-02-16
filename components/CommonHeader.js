import React, { useRef, useState } from 'react'
import styles from '../styles/HomePage.module.css'
import Image from 'next/image'
import { CSSTransition } from 'react-transition-group'
import { ENTERED } from 'react-transition-group/Transition'

function CommonHeader() {
	
	const [nav_toggle, setnav_toggle] = useState(false)
	const onNavToggle = () => {
		console.log("clciked")
		
		setnav_toggle((prev_state) => {
			return prev_state ? false : true
		})
	}


	return (
		<header className={styles.header_panel}>
			<button className={styles.menu_btn} onClick={(e) => onNavToggle()}></button>
			<div className={styles.logo_context_header_wrapper}>
				<div className={styles.logo_wrapper_ext}>
					<div className={styles.logo_wrapper}>
						<Image src="/PeerlLogo2.svg" alt="PEERL Logo" layout='fill' quality="100" />
					</div>
				</div>
				<p className={styles.context_header}>peer group</p>
			</div>
			<div className={styles.btns_container}>
				<button className={styles.search_button}></button>
				<button className={styles.notification_button}></button>
				<button className={styles.settings_btn}></button>
				<div className={styles.user_capsule}>
					<div className={styles.avtr_image}>
						<Image src='/empty_face.svg' layout='fill'></Image>
					</div>
					<div className={styles.avtr_content}>
						<p className={styles.user_name}>alby</p>
						<p className={styles.user_rank}>expert</p>
					</div>
				</div>
			</div>

			<CSSTransition in={nav_toggle} timeout={500} classNames={{
			enter: styles.navdrawerEnter,
			enterActive: styles.navdrawerEnterActive,
			enterDone: styles.navdrawerDone,
			exit: styles.navdrawerExit,
			exitActive: styles.navdrawerExitActive,
			exitDone: styles.navdrawerexitDone}}
			onEntered={(node, isAppearing) => {
				console.log("logging after entered",node)
				node.focus({
					preventScroll: true
				})
				
			}}
			>
				<Nav_drawer toggle={onNavToggle} />
			</CSSTransition>
		</header>
	)
}


function Nav_drawer({toggle}) {
	return (
		<div tabIndex={1} className={styles.navdrawer} onBlur={toggle}>

				<ul>
					<li>settings</li>
					<li>notifications</li>
				</ul>
			</div>

		// <CSSTransition in={open} timeout={2000} classNames={{
		// 	// appear: styles.navdrawer,
		// 	enter: styles.navdrawerEnter,
		// 	enterActive: styles.navdrawerEnterActive,
		// 	exit: styles.navdrawerExit,
		// 	exitActive: styles.navdrawerExitActive}}>
			
		// </CSSTransition>

	)
}

export default CommonHeader