create table users(
                      id integer primary key autoincrement,
                      username text unique not null,
                      password_hash text not null,
                      role text not null check(role in ('PARENT','CHILD')),
                      display_name text not null,
                      parent_id integer,
                      created_at text default (datetime('now')),
                      foreign key(parent_id) references users(id)
);

create table chore(
                      id integer primary key autoincrement,
                      title text not null,
                      description text,
                      schedule_type text not null check(schedule_type in ('DAILY','WEEKLY')),
                      expires_end_of_period integer not null check (expires_end_of_period in (0,1)),
                      created_by_user_id integer not null,
                      assigned_child_id integer,
                      reward_type text not null check(reward_type in ('MONEY','POINTS','TREAT')),
                      reward_value real not null,
                      status text not null check(status in ('TODO','AWAITING_PARENT','APPROVED','REJECTED')) default 'TODO',
                      is_adhoc integer not null default 0,
                      due_date text,
                      created_at text default (datetime('now')),
                      updated_at text,
                      foreign key(created_by_user_id) references users(id),
                      foreign key(assigned_child_id) references users(id)
);

create table chore_event(
                            id integer primary key autoincrement,
                            chore_id integer not null,
                            child_id integer not null,
                            action text not null check(action in ('MARK_DONE','PARENT_CONFIRM','PARENT_REJECT')),
  at text default (datetime('now')),
  foreign key(chore_id) references chore(id),
  foreign key(child_id) references users(id)
);

create table behavior_event(
                               id integer primary key autoincrement,
                               child_id integer not null,
                               points integer not null,
                               note text,
                               created_by_user_id integer not null,
                               created_at text default (datetime('now')),
                               foreign key(child_id) references users(id),
                               foreign key(created_by_user_id) references users(id)
);

create table reward_ledger(
                              id integer primary key autoincrement,
                              child_id integer not null,
                              source text not null check(source in ('CHORE','MANUAL','ADJUSTMENT')),
                              reward_type text not null check(reward_type in ('MONEY','POINTS','TREAT')),
                              amount real not null,
                              status text not null check(status in ('PENDING','GIVEN')) default 'PENDING',
                              chore_id integer,
                              created_at text default (datetime('now')),
                              given_at text,
                              foreign key(child_id) references users(id),
                              foreign key(chore_id) references chore(id)
);