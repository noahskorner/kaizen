DELETE FROM account_history;

DO $$ 
DECLARE 
    i INT;
    iterations INT;
    start_date TIMESTAMP := '2022-01-01 00:00:00';
    current_date TIMESTAMP := NOW();
    account_id TEXT := '79322b7d-e949-42c8-830d-858c4d57af1f';
    account_external_id TEXT := 'R5rM71GPd9Hn8lA8bDnbH4aJLV88AjCakrW4k';
    base_value INT := 1000;
    increment INT := 10;
    max_randomness INT := 100;

BEGIN 
    -- Calculate the number of iterations needed (weekly)
    iterations := EXTRACT(EPOCH FROM current_date - start_date) / (7 * 24 * 3600);

    FOR i IN 1..iterations LOOP
        INSERT INTO public.account_history (
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
        VALUES (
            gen_random_uuid(),
            start_date + (i || ' weeks') :: INTERVAL,
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
