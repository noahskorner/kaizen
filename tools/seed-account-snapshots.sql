DO $ $ DECLARE i INT;

start_date TIMESTAMP := NOW();

account_id TEXT := 'a314e4fd-adbf-4ae8-b67a-ad7fbade980a';

-- Replace with actual account ID
BEGIN FOR i IN 1..100 LOOP
INSERT INTO
    public.account_snapshot (
        id,
        created_at,
        snapshot_id,
        account_id,
        external_id,
        available,
        current,
        "limit",
        iso_currency_code,
        unofficial_currency_code,
        mask,
        name,
        official_name,
        type,
        subtype,
        verification_status
    )
VALUES
    (
        gen_random_uuid(),
        -- or use a UUID generation function
        start_date + (i || ' hours') :: INTERVAL,
        gen_random_uuid(),
        account_id,
        'KBey8XEzo1HJejNp83JkSx1eoeDnevFRoy1qe',
        1000 + (i * 10),
        -- gradually increasing available balance
        1000 + (i * 10),
        -- same for current balance for simplicity
        5000,
        'USD',
        NULL,
        'xxxx' || LPAD(i :: TEXT, 4, '0'),
        'Account ' || i,
        'Official Account ' || i,
        'Other',
        NULL,
        NULL
    );

END LOOP;

END $ $;

SELECT
    *
FROM
    account;