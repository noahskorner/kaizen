DELETE FROM account_snapshot;

DO $$ DECLARE i INT;

start_date TIMESTAMP := NOW();

account_id TEXT := '152e9299-9d16-4702-bddc-91cac9e59a8b';
account_external_id TEXT := 'bLWMxopa7qI58PlQovvyu641AWza4ncm6P984';
base_value INT := 1000;
increment INT := 10;
max_randomness INT := 100;

-- Max randomness added to each increment
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
        start_date + (i || ' hours') :: INTERVAL,
        gen_random_uuid(),
        account_id,
        account_external_id,
        base_value + (i * increment) + (random() * max_randomness) :: INT,
        base_value + (i * increment) + (random() * max_randomness) :: INT,
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

END $$;