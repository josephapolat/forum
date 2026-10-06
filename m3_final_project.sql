--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 12.8

-- Started on 2025-10-20 01:38:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 23425)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    title character varying(100),
    author character varying(25),
    body character varying(800)
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 23467)
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 23475)
-- Name: profile_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_profile_id_seq OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 23446)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    profile_id integer DEFAULT nextval('public.profile_profile_id_seq'::regclass) NOT NULL,
    nickname character varying(25),
    bio character varying(255),
    user_id integer
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 23453)
-- Name: reply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reply (
    reply_id integer NOT NULL,
    post_id integer NOT NULL,
    author character varying(255) NOT NULL,
    body text NOT NULL
);


ALTER TABLE public.reply OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 23451)
-- Name: reply_reply_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reply_reply_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_reply_id_seq OWNER TO postgres;

--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 205
-- Name: reply_reply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reply_reply_id_seq OWNED BY public.reply.reply_id;


--
-- TOC entry 208 (class 1259 OID 23472)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 23441)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    username character varying(15),
    password character varying(100),
    email character varying(50),
    location character varying(50),
    role character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2709 (class 2604 OID 23456)
-- Name: reply reply_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply ALTER COLUMN reply_id SET DEFAULT nextval('public.reply_reply_id_seq'::regclass);


--
-- TOC entry 2845 (class 0 OID 23425)
-- Dependencies: 202
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, title, author, body) FROM stdin;
111111111	any tips for strawberries?	jon doe	anyone know any tips for\nhaving larger strawberries? Mine always seem to stay small despite fertilizing, water,\netc.
222222222	first success with potatoes!	sam smith	just harvested my first\ncrop of potatoes! Now time to re-harvest and eat some of the bigger ones! Will post\nupdates soon!
333333333	correct soil depth for apple trees?	johnny appleseed	have a\nhoneycrisp tree. Google says 1ft but that seems too shallow. Thoughts???
444444444	composting tips	kyle koala	hi guys, thought Id share some\ncomposting tips since a lot of people have been asking.
1	need help with celery	johndoe73	hi guys, need help groing celery
2	new apple discovered!	japplez	guys i just made a purple apple
3	hi guys, new here	happyguy	hi
\.


--
-- TOC entry 2847 (class 0 OID 23446)
-- Dependencies: 204
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (profile_id, nickname, bio, user_id) FROM stdin;
1	jon doe	just your average jon doe	1
2	sam smith	stayyyyyyy with meeeeeeee	2
3	johnny appleseed	my favorite fruit is pears :0	3
4	kyle koala	hi	4
\.


--
-- TOC entry 2849 (class 0 OID 23453)
-- Dependencies: 206
-- Data for Name: reply; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reply (reply_id, post_id, author, body) FROM stdin;
1	111111111	johndoe73	hi
2	333333333	johndoe73	i've found 1.5ft is ideal
3	1	johndoe73	anyone got any ideas?
4	1	ssmith99	have you tried soil?
5	111111111	japplez	sun
6	111111111	japplez	or like light
7	333333333	happyguy	@johndoe73 idk i think 1ft is plenty
\.


--
-- TOC entry 2846 (class 0 OID 23441)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email, location, role) FROM stdin;
1	johndoe73	$2a$10$pkWoCh2P7OhOOZDzzwtNRee09mgu/SSY9nAXiwkIm4646gjRBHPiG	jdoe73@yahoo.com	US	ROLE_USER
2	ssmith99	$2a$10$pkWoCh2P7OhOOZDzzwtNRee09mgu/SSY9nAXiwkIm4646gjRBHPiG	smithsss@gmail.com	CA	ROLE_USER
3	japplez	$2a$10$pkWoCh2P7OhOOZDzzwtNRee09mgu/SSY9nAXiwkIm4646gjRBHPiG	mrappleseed@aol.com	US	ROLE_USER
4	kykoala5	$2a$10$pkWoCh2P7OhOOZDzzwtNRee09mgu/SSY9nAXiwkIm4646gjRBHPiG	koolkylekoala@gmail.com	AU	ROLE_USER
5	happyguy	$2a$10$ZSoLVXJebe7EqQJkyqpmHexAfWPkcxen8cm3zGpPC3sBW3PuJq57.	happyguy15@gmail.com	AS	user
6	newuser	$2a$10$s5wl9Nfon0FdDf4zGem1r.cFgWVvldCU/eEW28s0YhPdU.lUPrCGe	newuser@yahoo.com	BH	user
7	newuser	$2a$10$s5wl9Nfon0FdDf4zGem1r.cFgWVvldCU/eEW28s0YhPdU.lUPrCGe	newuser@yahoo.com	BH	user
8	newuserrrr	$2a$10$3oIKiZ7h0pY6Qg1qhs/sJOssdynLfZOwMNL8IdrTYaVNIUbf2dKMK	newuser@yahoo.com	BH	user
9	newuserrrr	$2a$10$3oIKiZ7h0pY6Qg1qhs/sJOssdynLfZOwMNL8IdrTYaVNIUbf2dKMK	newuser@yahoo.com	BH	user
10	fffff	$2a$10$f949TsNy9SZABRPAYN4Iiev1ng/V45lFfefAWTRxQVg4ETTaHmYRa	fffff@gmail.com	BB	user
11	fffff	$2a$10$f949TsNy9SZABRPAYN4Iiev1ng/V45lFfefAWTRxQVg4ETTaHmYRa	fffff@gmail.com	BB	user
12	eeeee	$2a$10$LRueCGAW2qxQtqaBIOX.nOqjquO09c.DPbPmWa2qJnWxICkrc7E5.	fffff@gmail.com	BB	user
\.


--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 207
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 3, true);


--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 209
-- Name: profile_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_profile_id_seq', 2, true);


--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 205
-- Name: reply_reply_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reply_reply_id_seq', 7, true);


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- TOC entry 2711 (class 2606 OID 23432)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 2715 (class 2606 OID 23479)
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (profile_id);


--
-- TOC entry 2717 (class 2606 OID 23461)
-- Name: reply reply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_pkey PRIMARY KEY (reply_id);


--
-- TOC entry 2713 (class 2606 OID 23445)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2718 (class 2606 OID 23462)
-- Name: reply reply_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


-- Completed on 2025-10-20 01:38:26

--
-- PostgreSQL database dump complete
--

